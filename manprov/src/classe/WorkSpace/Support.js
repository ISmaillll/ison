import React from 'react';
import { NavWSpace } from './NavWSpace';

export function SupportPage ({log,closeMenu}) {
  window.scroll(0,0)
  return (
    <div className='ProSW'>
    <div className='WSpace'>
    <div className="container ">
      <h1 className="my-5">Support Page</h1>
      <p>Welcome to our support page. If you need help with our product or have any questions, please don't hesitate to contact us.</p>
      <p className="my-4">By using our product, you agree to the following utilization rules:</p>
      <ul>
        <li>Do not use our product for illegal activities.</li>
        <li>Do not distribute or share our product without our permission.</li>
        <li>Do not modify or reverse engineer our product.</li>
        <li>Do not use our product in a way that violates the terms of service of any third-party services or platforms that our product integrates with.</li>
        <li>Do not use our product to harass or harm others.</li>
        <li>Do not use our product to collect personal information from others without their consent.</li>
        <li>Do not use our product to spam or send unsolicited messages.</li>
        <li>Do not use our product in a way that could damage our servers or infrastructure.</li>
        <li>Do not use our product to impersonate others or misrepresent your identity.</li>
        <li>Do not use our product to engage in phishing or other fraudulent activities.</li>
      </ul>
 
      <p>If you need additional assistance, please contact our support team at <i class="bi bi-envelope m-2"></i><a className='text-light' href="mailto:SupportISON.com" target='_blank'>support@ison.com</a> or call us at <i class="bi bi-telephone m-2"></i><a className='text-light' href="tel:555-555-5555">555-555-5555</a>.</p>
      <p className="mt-5">&copy; 2023 ISON. All rights reserved.</p>
    </div>
    </div>
    </div>
  );
};
