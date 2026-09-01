// Type Imports
import type { FaqCategory } from '@/types/faq'

export const db: FaqCategory[] = [
  {
    value: 'shipping',
    label: 'Shipping',
    icon: 'package',
    heading: 'Shipping related Questions',
    items: [
      {
        question: 'When will my order be shipped?',
        answer:
          "We usually process and ship orders within 24-48 hours. You'll get a tracking link as soon as your order is dispatched."
      },
      {
        question: 'How long does delivery take?',
        answer:
          'Standard delivery typically takes 5-7 business days. Express options are available at checkout for faster delivery, and you can track every step along the way.'
      },
      {
        question: 'How can I track my order?',
        answer:
          "Once your order ships, you'll receive a tracking number via email. Enter it on our Track Order page to see real-time updates on your shipment."
      },
      {
        question: 'Do you offer express or same-day delivery?',
        answer:
          'Yes, express and same-day delivery are available for select locations. Choose your preferred delivery speed at checkout to see the available options.'
      },
      {
        question: 'What are the shipping charges?',
        answer:
          'Shipping charges are calculated based on your location, order weight, and chosen delivery speed. Free shipping is available on orders above the qualifying amount.'
      },
      {
        question: 'Can I change my shipping address after placing an order?',
        answer:
          "You can update your shipping address within a short window after placing your order. Contact customer support as soon as possible if the order hasn't shipped yet."
      },
      {
        question: 'What happens if I miss the delivery?',
        answer:
          'If you miss a delivery, the carrier will leave a notice with instructions for redelivery or pickup. You can also reschedule using the tracking link.'
      }
    ]
  },
  {
    value: 'account',
    label: 'My Account',
    icon: 'user',
    heading: 'Account related Questions',
    items: [
      {
        question: 'How do I create an account?',
        answer:
          "Click on 'Sign Up' at the top right corner of the page. Fill in your details like name, email, and password. You'll receive a verification email to activate your account."
      },
      {
        question: 'How do I reset my password?',
        answer:
          "On the login page, click 'Forgot Password'. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
      },
      {
        question: 'Can I change my email address?',
        answer:
          "Yes, you can update your email in the Account Settings section. You'll need to verify the new email address before the change takes effect."
      },
      {
        question: 'How do I update my profile information?',
        answer:
          "Log in to your account and go to 'My Account' or 'Profile Settings'. You can update your personal details, shipping addresses, and preferences there."
      },
      {
        question: 'Is my personal information secure?',
        answer:
          'Absolutely! We use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without your consent.'
      },
      {
        question: 'Can I delete my account?',
        answer:
          'Yes, you can request account deletion from your Account Settings. Please note that this action is permanent and will remove all your order history and saved information.'
      },
      {
        question: 'How do I subscribe to newsletters?',
        answer:
          "You can subscribe to our newsletter during account creation or anytime from your Account Settings. Check the 'Email Preferences' section to manage your subscription."
      }
    ]
  },
  {
    value: 'orders',
    label: 'Orders',
    icon: 'notebook',
    heading: 'Orders related Questions',
    items: [
      {
        question: 'How do I place an order?',
        answer:
          'Browse our products, add items to your cart, and proceed to checkout. Fill in your shipping details and payment information to complete your order.'
      },
      {
        question: 'Can I modify my order after placing it?',
        answer:
          'Once an order is placed, you have a limited time window to modify it. Contact our customer support immediately if you need to make changes. After the order is processed, modifications may not be possible.'
      },
      {
        question: 'How can I cancel my order?',
        answer:
          "You can cancel your order within 24 hours of placing it, as long as it hasn't been shipped. Go to 'My Orders' and click the cancel button, or contact customer support for assistance."
      },
      {
        question: 'Where can I view my order history?',
        answer:
          "Log in to your account and navigate to 'My Orders' section. You'll find a complete list of all your past and current orders with their status and details."
      },
      {
        question: 'What does each order status mean?',
        answer:
          "Order statuses include: Pending (being processed), Confirmed (payment received), Shipped (on the way), Out for Delivery (arriving soon), and Delivered (completed). You'll receive notifications for each status change."
      },
      {
        question: 'Can I order items that are out of stock?',
        answer:
          "Out of stock items can't be ordered immediately. However, you can sign up for notifications to be alerted when the product becomes available again."
      },
      {
        question: 'Do you offer bulk order discounts?',
        answer:
          "Yes, we offer special pricing for bulk orders. Contact our sales team with your requirements, and they'll provide you with a customized quote."
      }
    ]
  },
  {
    value: 'payments',
    label: 'Payments',
    icon: 'dollar',
    heading: 'Payments related Questions',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and digital wallets like Apple Pay and Google Pay. Select your preferred method at checkout.'
      },
      {
        question: 'Is my payment information secure?',
        answer:
          'Absolutely! We use SSL encryption and PCI DSS compliant payment gateways to protect your payment information. We never store your complete card details on our servers.'
      },
      {
        question: 'What should I do if my payment fails?',
        answer:
          "Check your card details and available balance. Ensure your billing address matches your bank records. If the issue persists, try a different payment method or contact your bank to verify the transaction wasn't blocked."
      },
      {
        question: 'When will I receive payment confirmation?',
        answer:
          "You'll receive an immediate confirmation on screen after payment, followed by an email confirmation within minutes. Check your spam folder if you don't see it in your inbox."
      },
      {
        question: 'Do you offer installment payment options?',
        answer:
          "Yes, we offer flexible payment plans through Klarna, Afterpay, and Affirm for eligible purchases. Choose 'Pay in Installments' at checkout to see available options based on your order value."
      },
      {
        question: 'Can I use gift cards or vouchers?',
        answer:
          'Yes! Enter your gift card or promo code in the designated field at checkout. You can combine multiple gift cards, but only one promo code per order unless specified otherwise.'
      },
      {
        question: 'What currencies do you accept?',
        answer:
          'We accept payments in USD, EUR, GBP, CAD, and AUD. The currency is automatically selected based on your location, but you can change it from the currency selector in the header.'
      }
    ]
  },
  {
    value: 'tracking',
    label: 'Tracking and Delivery',
    icon: 'truck',
    heading: 'Tracking and Delivery related Questions',
    items: [
      {
        question: 'How can I track my order?',
        answer:
          "Once your order ships, you'll receive a tracking number via email. Click the tracking link or enter it on our Track Order page to see real-time updates on your shipment's location and estimated delivery."
      },
      {
        question: 'My tracking shows no movement. What should I do?',
        answer:
          "Tracking information can take 24-48 hours to update after shipment. If there's no movement after 3 business days, contact customer support with your tracking number for assistance."
      },
      {
        question: 'What are the typical delivery timeframes?',
        answer:
          'Standard delivery: 5-7 business days. Express: 2-3 business days. Next-day delivery available for select locations. International orders typically arrive within 10-15 business days depending on customs clearance.'
      },
      {
        question: 'What if my delivery is delayed?',
        answer:
          'Delays can occur due to weather, high volume, or carrier issues. Check your tracking for updates. If your order is significantly delayed beyond the estimated date, contact us for a resolution or refund options.'
      },
      {
        question: 'Do I need to sign for my delivery?',
        answer:
          'Signature requirements depend on the order value and shipping method. High-value items typically require a signature. If no one is available, the carrier will leave a notice with instructions for redelivery or pickup.'
      },
      {
        question: 'Can I have my order delivered to a different address?',
        answer:
          'Yes, you can specify a different shipping address during checkout. You can also save multiple addresses in your account for easy selection. Just ensure someone is available to receive the package.'
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by destination. Customs duties and taxes may apply and are the responsibility of the recipient.'
      }
    ]
  },
  {
    value: 'returns',
    label: 'Returns & Exchanges',
    icon: 'users',
    heading: 'Return and Exchange related Questions',
    items: [
      {
        question: 'What is your return policy?',
        answer:
          'We offer a 30-day return policy for most items. Products must be unused, in original packaging, with all tags attached. Some items like electronics, intimate wear, and personalized products may have different return conditions.'
      },
      {
        question: 'How do I initiate a return?',
        answer:
          "Log into your account, go to 'My Orders', select the item you want to return, and click 'Request Return'. You'll receive a prepaid return label via email within 24 hours. Pack the item securely and ship it back."
      },
      {
        question: 'Can I exchange an item instead of returning it?',
        answer:
          "Yes! Select 'Exchange' instead of 'Return' when initiating your request. Choose your preferred size, color, or alternative product. Exchanges are processed once we receive and inspect your returned item."
      },
      {
        question: 'How long does it take to receive my refund?',
        answer:
          'Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method. Allow an additional 3-5 days for your bank to process the transaction.'
      },
      {
        question: 'Who pays for return shipping?',
        answer:
          'We provide free return shipping for defective or incorrect items. For standard returns due to change of mind, a small shipping fee may be deducted from your refund. Premium members enjoy free returns on all orders.'
      },
      {
        question: 'What if I received a damaged or defective item?',
        answer:
          "Contact customer support immediately with photos of the damage or defect. We'll arrange for a free replacement or full refund, including return shipping costs. You'll receive priority processing for such cases."
      },
      {
        question: 'Can I return sale or clearance items?',
        answer:
          "Sale items can be returned within 14 days for store credit or exchange only. Final clearance items marked 'final sale' are not eligible for return unless defective. Check the product page for specific return eligibility."
      }
    ]
  },
  {
    value: 'warranty',
    label: 'Warranty & Repairs',
    icon: 'award',
    heading: 'Warranty and Repairs related Questions',
    items: [
      {
        question: 'What does your warranty cover?',
        answer:
          'Our warranty covers manufacturing defects, faulty materials, and workmanship issues. It includes free repairs or replacement of defective parts during the warranty period. Normal wear and tear, misuse, or accidental damage are not covered.'
      },
      {
        question: 'How long is the warranty period?',
        answer:
          'Standard warranty is 1 year from the date of purchase. Some premium products come with extended 2-3 year warranties. Electronics typically have manufacturer warranties ranging from 6 months to 2 years. Check your product page for specific warranty details.'
      },
      {
        question: 'How do I claim warranty service?',
        answer:
          "Contact customer support with your order number and description of the issue. Provide photos if possible. We'll assess the problem and provide a warranty claim number. You may need to ship the item to our service center for inspection and repair."
      },
      {
        question: 'Do you offer repair services for out-of-warranty items?',
        answer:
          "Yes, we offer paid repair services for items beyond warranty. Request a repair quote by contacting support. We'll diagnose the issue and provide an estimate. Repairs typically take 7-14 business days after approval."
      },
      {
        question: "What's not covered under warranty?",
        answer:
          'Exclusions include: accidental damage, misuse, unauthorized repairs, cosmetic damage not affecting functionality, consumable parts, and damage from improper storage or environmental factors. Proof of purchase is required for all warranty claims.'
      },
      {
        question: 'Can I purchase an extended warranty?',
        answer:
          'Yes, extended warranty plans are available for select products at checkout. These plans extend coverage up to 3-5 years and may include additional benefits like accidental damage protection. Purchase within 30 days of your original order.'
      },
      {
        question: 'Do I need to register my product for warranty?',
        answer:
          'Product registration is recommended but not mandatory. Your order confirmation serves as proof of purchase. Registering your product helps expedite warranty claims and keeps you informed about recalls or important updates.'
      }
    ]
  },
  {
    value: 'contact',
    label: 'Contact Us',
    icon: 'phone',
    heading: 'Contacts related Questions',
    items: [
      {
        question: 'What are your customer support hours?',
        answer:
          'Our customer support team is available Monday to Friday, 9 AM to 6 PM EST. Weekend support is available from 10 AM to 4 PM EST. For urgent issues, you can reach our 24/7 emergency line.'
      },
      {
        question: 'How can I contact customer support?',
        answer:
          'You can reach us via email at support@example.com, call us at 1-800-123-4567, use our live chat feature on the website, or submit a ticket through your account dashboard. We also have social media support on Twitter and Facebook.'
      },
      {
        question: 'How quickly will I get a response?',
        answer:
          'Live chat inquiries are answered within minutes during business hours. Email responses typically arrive within 24 hours. Phone calls are answered immediately during support hours. Urgent issues receive priority handling.'
      },
      {
        question: 'Do you offer live chat support?',
        answer:
          "Yes! Click the chat icon in the bottom right corner of any page to connect with a live agent. Chat support is available during business hours. Outside these hours, you can leave a message and we'll respond via email."
      },
      {
        question: 'Where are your physical store locations?',
        answer:
          'We have retail locations in major cities across the country. Visit our Store Locator page to find the nearest store, view hours, and get directions. Some stores offer in-person consultation and product demonstrations.'
      },
      {
        question: 'How do I file a complaint or provide feedback?',
        answer:
          "We value your feedback! Use the 'Contact Us' form, email feedback@example.com, or call our customer care number. For formal complaints, request to speak with a supervisor. We take all feedback seriously and respond within 48 hours."
      },
      {
        question: "What if my question isn't answered in the FAQ?",
        answer:
          "Don't hesitate to reach out! Contact our customer support team through any of our channels. We're here to help with any questions, no matter how unique. You can also check our Help Center for additional resources and guides."
      }
    ]
  }
]
