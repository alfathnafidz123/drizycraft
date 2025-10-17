import { FiGlobe } from '@react-icons/all-files/fi/FiGlobe';
import { MdEmail } from '@react-icons/all-files/md/MdEmail';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#F4F6FC] font-sans">
      
      {/* Header */}
      <div className="bg-white w-full py-6 px-4 shadow-sm mb-10 mt-6">
        <h1 className="text-center text-4xl font-katide-bold">
          CANCELLATION POLICY
        </h1>
      </div>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto space-y-6 px-4 md:px-20 py-10 text-sm sm:text-base md:text-[16px] leading-relaxed font-inter-regular">
        <p>
          At Drizy Craft, we value our customers to make every experience smooth and transparent.Please
          read our cancellation policy carefully before making a purchase
        </p>
      </section>

      {/* Collecting and Using Your Personal Data */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 pb-16 text-[16px] leading-relaxed font-inter">
        <div className="space-y-6">
          {/* Personal Data */}
          <div className="text-sm sm:text-base md:text-[16px] leading-relaxed font-inter-regular space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Membership Cancellations</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>You can cancel your membership anytime through the Drizy Craft account</li>
              <li>Once you cancel, no further payments will be charged.</li>
              <li>Your membership will remain active until the end of your current billing period.</li>
              <li>Once the billing period ends, your access to member-exclusive content and benefits will
                automatically stop.
              </li>
            </ul>
          </div>
          <div className="text-sm sm:text-base md:text-[16px] leading-relaxed font-inter-regular space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Automatic Renewal</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>All memberships (including free trial, basic 1 month, and annual access) are automatically
                renewed at the end of each billing cycle, unless cancelled before the next renewal date.
              </li>
              <li>By maintaining an active membership, you authorize Drizy Craft to automatically charge
                your saved payment method for the next billing period.</li>
              <li>If you do not wish to continue, please make sure to cancel your membership before the next
                billing date to avoid being charged automatically.
              </li>
              <li>Renewal charges are non-refundable once processed.
              </li>
            </ul>
          </div>
          <div className="text-sm sm:text-base md:text-[16px] leading-relaxed font-inter-regular space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">How to Cancel</h4>
            <p>
              To cancel your membership:
            </p>
            <ul className="list-decimal list-inside space-y-1">
              <li>Log in to your Drizy Craft account.
              </li>
              <li>Go to your Profile page.</li>
              <li>Select the Subscriptions menu.
              </li>
              <li>Click the Cancel Subscription button to end your current plan
              </li>
            </ul>
          </div>
          <p className="my-6">
            If you encounter any technical issues cancelling through your account, please contact us at
            <Link href="mailto:admin@drizystudio.com" className='text-blue-600'> admin@drizystudio.com</Link>, and our team will assist you directly.
          </p>
          <div className="text-sm sm:text-base md:text-[16px] leading-relaxed font-inter-regular space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Refund Policy</h4>
            <ul className="list-decimal list-inside space-y-1">
              <li>All membership payments are non-refundable, including renewals, partial months, or unused
                time after cancellation.
              </li>
              <li>Refunds are only issued in specific cases such as duplicate charges or technical errors,
                subject to review by our support team.</li>
              <li>Once a payment is processed for renewal, it cannot be refunded.
              </li>
            </ul>
          </div>
          <div className="text-sm sm:text-base md:text-[16px] leading-relaxed font-inter-regular space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">After Cancellation</h4>
            <ul className="list-decimal list-inside space-y-1">
              <li>You will continue to have access to your membership benefits until the end of the current
                billing period.
              </li>
              <li>After your membership expires, you may still use files or assets you downloaded during your
                active subscription, in accordance with the license terms provided at the time of download.</li>
            </ul>
          </div>
          <div className="text-sm sm:text-base md:text-[16px] leading-relaxed font-inter-regular space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Contact Us</h4>
            <p>
              If you have any questions about your membership, cancellation, or renewal, please contact our
              support team at <Link href="mailto:admin@drizystudio.com" className='text-blue-600'> admin@drizystudio.com</Link>.
            </p>
            <p>
              We are always happy to assist and ensure your experience with Drizy Craft remains positive and
              transparent.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
