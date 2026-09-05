# Backend spec: storefront and admin on the Deep Beauty Research database

Decisions (2026-09-05): one Supabase project, the one Deep Beauty Research already uses. The old
app keeps running on it. The new storefront (`onrise-web`) and the new admin (`dbr-admin`) are two
more front ends on the same tables. Payments stay as they are: order created, payment link emailed,
Stripe for cards, bank transfer and crypto marked paid by hand. Products live in the database and
are edited in the admin.

## Ground rules

- The database is multi-tenant. `sites` holds several brands. Every read and write from either app
  filters `site_id = 'deep-beauty-research'`. The admin never lists another site's rows.
- Schema source of truth is the old app's migrations folder (`dbr-web/dashboard/supabase/migrations`).
  New migrations are written into `dbr-admin/supabase/migrations`, and are applied to production only
  on the user's explicit go. Nullable, additive columns only; never rename or drop what the old app reads.
- Secrets come from `.env.local` in each app. Nothing secret is committed.
- Customer reads go through row-level security with the customer's own session. Admin reads and
  writes go through the service key on the server, after an `admin_users` check, as the old app does.

## Tables the two apps use

| Table | Storefront | Admin |
|---|---|---|
| products | read (public policy) | create, edit, activate, stock, prices |
| profiles, addresses | own rows (RLS) | read, edit, archive |
| orders, order_items | own rows (RLS); checkout inserts via server action | list, status ladder, notes, tracking, send payment link, mark paid |
| promo_codes | validate at checkout | create, edit, deactivate |
| partner_codes, partner_referrals, partner_commissions, partner_applications | partner's own rows | review, approve, payouts |
| customer_events | write on key events | read on customer profile |
| admin_users, admin_audit_log | none | owner manages admins; every mutation audited |

Order status ladder (existing enum): draft, payment_link_sent, awaiting_bank_transfer,
awaiting_crypto, paid, shipped, delivered, refunded, expired, cancelled.

## Slices, in order

1. Catalogue from the database (done). Storefront merges DB rows by slug with JSON display metadata.
   MOTS-c is inactive in the DB, so it shows as unavailable until activated in the admin.
2. Product metadata columns (migration, needs go): compound, form, strength_mg, fill_ml, family,
   family_name, variant_order, category, collections, sale_price_cents, is_new, sort, images (jsonb),
   dial_image, copy (jsonb: description, overview, contents). Backfill from the storefront JSON by
   slug. Then the storefront reads everything from the DB and the JSON goes.
3. Customer auth on the storefront's login, register, forgot and reset screens (Supabase email and
   password). Account pages read the customer's own profile, addresses, orders and order items.
   Wishlist stays local until a table is wanted.
4. Admin auth: Supabase sign-in plus `admin_users` check, on the admin's login screen. Admin orders,
   customers, products, promo codes and partners wired to the tables, service key on the server,
   every mutation written to `admin_audit_log`.
5. Storefront checkout: reproduce the old app's server action shape (address, delivery, payment
   method, promo and partner code, one product per order) so the existing Stripe webhook and the
   admin's status ladder keep working. Payment-link email via Resend using the same templates.
6. Retire the demo data from both apps.

## What is deliberately not built

Wallet, gift cards and saved cards in the storefront account area stay as UI until the shop decides
to run them. Two-factor stays a screen until Supabase MFA is switched on.
