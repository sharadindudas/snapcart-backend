export const verifyotptemplate = (otp: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SnapCart OTP Verification</title>
    <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
        * {
            font-family: 'Inter', Arial, sans-serif;
        }
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
        @media only screen and (max-width: 600px) {
            .responsive-table {
                width: 100% !important;
            }
            .responsive-img {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important;
            }
        }
    </style>
</head>
<body style="background-color: #f9f9f9; margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 0 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" class="responsive-table">
                    <tr>
                        <td bgcolor="#ffffff" align="center" style="padding: 40px 30px 20px 30px; border-radius: 5px 5px 0 0;">
                            <h1 style="font-size: 28px; font-weight: 700; margin: 0;  color: #000000;">OTP Verification</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0 30px 20px 30px; color: #666666; font-family: 'Inter', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">Dear SnapCart Customer,</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0 30px 20px 30px; color: #666666; font-family: 'Inter', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">Thank you for choosing SnapCart. To complete your account verification, please use the following One-Time Password (OTP):</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="center" style="padding: 0 30px 20px 30px;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="border-radius: 4px;" bgcolor="#000000">
                                        <p style="font-size: 24px; font-family: 'Inter', Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 0 15px; border-radius: 4px;  border: 1px solid #000000; display: inline-block; font-weight: 700; margin: 10px;">${otp}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0 30px 20px 30px; color: #666666; font-family: 'Inter', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">This OTP is valid for 10 minutes. If you didn't request this verification, please ignore this email.</p>
                            <p style="margin: 20px 0 0 0;">Once verified, you'll have full access to our exclusive collections and amazing deals!</p>
                            <p style="margin: 20px 0 0 0;">Happy shopping!</p>
                            <p style="margin: 20px 0 0 0;">Best regards,<br>The SnapCart Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="center" style="padding: 30px; border-radius: 0 0 5px 5px; color: #7f8c8d; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                            <p style="margin: 0;">If you need any assistance, please contact us at support@snapcart.com</p>
                            <p style="margin: 10px 0 0 0;">&copy; 2024 SnapCart. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
};