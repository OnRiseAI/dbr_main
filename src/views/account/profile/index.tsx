// Component Imports
import PersonalInformationForm from '@/views/account/profile/personal-information-form'
import AddressForm from '@/views/account/profile/address-form'
import ChangePasswordForm from '@/views/account/profile/change-password-form'

const ProfileView = () => {
  return (
    <div className='space-y-3.5'>
      <PersonalInformationForm />
      <AddressForm />
      <ChangePasswordForm />
    </div>
  )
}

export { ProfileView }
export default ProfileView
