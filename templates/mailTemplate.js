function mailTemplate({
  userName,
  userEmail,
  referralCode,
  userPhone,
  createdAt,
}) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>New User Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f6f6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              <tr>
                <td style="background-color: #333; padding: 20px; color: #fff; text-align: center;">
                  <h2 style="margin: 0;">🔔 New User Referral Submission</h2>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px;">
                  <p style="font-size: 16px; margin-bottom: 20px;">Hello Team,</p>
                  <p style="font-size: 16px; margin-bottom: 20px;">
                    A new user has submitted their referral information. Here are the details:
                  </p>

                  <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; font-size: 15px;">
                    <tr>
                      <td style="background: #f9f9f9; border: 1px solid #ddd;"><strong>Name</strong></td>
                      <td style="border: 1px solid #ddd;">${userName}</td>
                    </tr>
                    <tr>
                      <td style="background: #f9f9f9; border: 1px solid #ddd;"><strong>Email</strong></td>
                      <td style="border: 1px solid #ddd;">${userEmail}</td>
                    </tr>
                    <tr>
                      <td style="background: #f9f9f9; border: 1px solid #ddd;"><strong>Phone</strong></td>
                      <td style="border: 1px solid #ddd;">${userPhone}</td>
                    </tr>
                    <tr>
                      <td style="background: #f9f9f9; border: 1px solid #ddd;"><strong>Referral Code</strong></td>
                      <td style="border: 1px solid #ddd; color: #4CAF50;"><strong>${referralCode}</strong></td>
                    </tr>
                    <tr>
                      <td style="background: #f1f1f1; border: 1px solid #ddd;"><strong>Created At</strong></td>
                      <td style="border: 1px solid #ddd;">${formatDate(
                        createdAt
                      )}</td>
                    </tr>
                  </table>

                  <p style="font-size: 14px; margin-top: 30px; color: #555;">
                    Please follow up if necessary.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #999;">
                  Internal Notification • ${new Date().toLocaleDateString()}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

module.exports = mailTemplate;
