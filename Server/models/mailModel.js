export const mailHTML = (otp) => {
    return (
        `<html>
            <head>
                <!-- Google Fonts CDN -->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Grey+Qo&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
                <!-- Bootstrap CDN -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>

            <style>
                .roboto-regular {
                    font-family: "Roboto", sans-serif;
                    font-weight: 500;
                    font-style: normal;
                }
            </style>

            <body class="roboto-regular p-5" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); padding: 1rem;">
            <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); padding: 1rem;">
                <div class="d-flex flex-column justify-content-center align-items-start" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border-radius: 1rem;">
                    <div style="display: flex; justify-content: center; align-items:center; background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 25%, rgba(0,212,255,1) 100%); padding: 0.5rem; color: white; width: 80%; border-radius: 1rem 1rem 0 0;">
                        <h1 class="d-flex justify-content-center align-items-start">${otp}</h1>
                    </div>
                    <div class="text-container p-3">
<pre>
Hello InstaTag customer,
this is your OTP for your registration. The validity of this OTP expires in 2 minutes. Use it as soon as possible.

For any support, please contact support@instatag.com

Thank you for choosing our service.
</pre>
                    </div>
                </div>
            </div>
            </body>
            <!-- Bootstrap CDN -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>`
    )
}
