'use client';

import Link from 'next/link';

export default function Terms() {
  return (
    <main>
      <section className='mb-[10%] ml-[9%] mr-[9%] flex bg-[#EBECF5] text-[#1A214C]'>
        <div className=' mb-[10%] ml-[8%] mr-[8%] mt-[10%] flex flex-col'>
          <p className='font-katide-bold text-[36px]'>Terms & Conditions</p>

          <p className='mt-[8%] text-[16px]'>
            Welcome to <b>Drizy Craft! </b>
          </p>
          <p className='mt-[4%] text-[16px]'>
            These terms and conditions outline the rules and regulations for the use of our website,
            accessible at <Link href='https://drizycraft.com' className='text-blue-600'> https://drizycraft.com.</Link>
          </p>
          <p className='mt-[4%] text-[16px]'>
            By accessing this website we assume you accept these terms and conditions. Do not continue to
            use Drizy Craft if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <p className='font-katide-bold mt-[8%] text-[24px]'>
            Intellectual Property Rights
          </p>
          <p className='mt-[24px] text-[16px]'>
            All content, trademarks, logos, digital files, and intellectual property displayed on this site are the
            property of Drizy Craft or its licensors.
          </p>
          <p className='mt-[24px] text-[16px]'>
            You may use the content for personal or licensed use only, in accordance with the license terms.
            Unauthorized reproduction, redistribution, or commercial use without permission is strictly
            prohibited.
          </p>

          <p className='font-katide-bold mt-[8%] text-[24px]'>
            User Accounts
          </p>
          <ul className="list-disc list-inside space-y-1 mt-[24px] text-[16px]">
            <li>To access certain features, including memberships, you may be required to register for an
              account.
            </li>
            <li>You must provide accurate and complete information.
            </li>
            <li>You are responsible for maintaining the confidentiality of your login information and for all
              activities under your account.
            </li>
          </ul>

          <p className='font-katide-bold mt-[8%] text-[24px]'>
            Membership, Purchases, and Payments
          </p>
          <ul className="list-disc list-inside space-y-1 mt-[24px] text-[16px]">
            <li>Drizy Craft offers membership plans, including free trial, monthly, and annual options
            </li>
            <li>All memberships are automatically renewed at the end of each billing cycle, unless cancelled
              before the renewal date.
            </li>
            <li>By subscribing, you authorize Drizy Craft to charge your saved payment method for
              recurring fees until cancellation.
            </li>
            <li>All purchases made on our website are subject to product availability and confirmation of the
              order price.
            </li>
            <li>Payments are processed securely through third-party providers.
            </li>
          </ul>

          <p className='font-katide-bold mt-[8%] text-[24px]'>
            Drizy Coins
          </p>
          <ul className="list-disc list-inside space-y-1 mt-[24px] text-[16px]">
            <li>Drizy Coins are virtual credits that can be purchased (topped up) and used exclusively to buy
              products on the Drizy Craft website.
            </li>
            <li>Once purchased, Drizy Coins cannot be refunded, exchanged for cash, or transferred to
              another user.
            </li>
            <li>Drizy Coins do not expire and will remain available in your account until fully used.
            </li>
            <li>The exchange rate between Drizy Coins and currency is determined by Drizy Craft and may
              change without prior notice.
            </li>
            <li>Drizy Coins are linked to your account and remain valid unless your account is terminated or
              suspended
            </li>
            <li>
              Drizy Craft reserves the right to adjust, modify, or discontinue the Drizy Coins system at any
              time.
            </li>
          </ul>

          <p className='font-katide-bold mt-[8%] text-[24px]'>
            Cancellations and Refunds
          </p>
          <ul className="list-disc list-inside space-y-1 mt-[24px] text-[16px]">
            <li>You may cancel your membership anytime through your account settings. Your access will
              remain active until the end of the current billing cycle.
            </li>
            <li>All membership payments are non-refundable, including renewals, partial months, or unused
              time after cancellation.
            </li>
            <li>Refunds will only be considered in exceptional cases, such as duplicate payments or
              technical errors.
            </li>
            <li>For more information, please see our Cancellation Policy.
            </li>
          </ul>

          <p className='font-katide-bold mt-[8%] text-[24px]'>
            Prohibited Uses
          </p>
          <p className='mt-[24px] text-[16px]'>
            You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-[24px] text-[16px]">
            <li>Use the website for unlawful activities or in violation of applicable laws.
            </li>
            <li>Transmit harmful software, spam, or malicious content.
            </li>
            <li>Infringe upon or misuse Drizy Craft’s intellectual property or that of others.
            </li>
            <li>Share or resell your membership account access.
            </li>
          </ul>

          <p className='font-katide-bold mt-[8%] text-[24px]'>
            Termination
          </p>
          <p className='mt-[24px] text-[16px]'>
            We reserve the right to suspend or terminate your account if you violate these Terms, misuse our
            services, or engage in fraudulent activity.
          </p>

          <p className='font-katide-bold mt-[8%] text-[24px]'>
            Limitation of Liability
          </p>
          <p className='mt-[24px] text-[16px]'>
            Drizy Craft is not liable for any indirect, incidental, or consequential loss or damage arising from
            your use or inability to use our site, products, or services. All services are provided “as is”
            without warranties of any kind.
          </p>

          <p className='font-katide-bold mt-[8%] text-[24px]'>
            Governing Law
          </p>
          <p className='mt-[24px] text-[16px]'>
            These terms are governed by the laws of Indonesia. Any disputes arising under these Terms shall
            be resolved in the competent courts of Indonesia.
          </p>

          <p className='font-katide-bold mt-[8%] text-[24px]'>
            Contact Us
          </p>
          <p className='mt-[24px] text-[16px]'>
            If you have any questions about these Terms, please contact us at <Link href="mailto:admin@drizystudio.com" className='text-blue-600'> admin@drizystudio.com</Link>.
          </p>

        </div>
      </section>
    </main>
  );
}
