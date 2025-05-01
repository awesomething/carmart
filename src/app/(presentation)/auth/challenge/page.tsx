
import { auth } from '@/auth';
import { OtpForm } from '@/components/auth/otp-form'


const ChallengePage = async () => {
  const session = await auth();
  // console.log("Session", { session });

  return (
    <OtpForm />
  )
}

export default ChallengePage