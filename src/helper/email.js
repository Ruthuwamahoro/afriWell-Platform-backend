import nodemailer from 'nodemailer'
// import fromEmail from "../routers/forgetPassword"
const { Email, password } = process.env;

export const mailer = async  (email,message) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:Email,
            pass:password,
        },
        tls: {
            rejectUnauthorized: false
          }
    });

    let sendinfo = {
        from: Email,
        to: email, 
        subject:"RESET PASSWORD CODE",
        html: `<b>${message}</b>`,
      };

      try {
        const sendMail =  transporter.sendMail(sendinfo,(error,info) =>{
            if(error){
                throw new Error(error)
            }
            return sendMail;
        })
      } catch (error) {
        return error;
      }
}

export const mail = async  (email,message) => {
  const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:Email,
          pass:password,
      },
      tls: {
          rejectUnauthorized: false
        }
  });

  let sendinfo = {
      from: Email,
      to: email, 
      subject:"Mental health platform Activated",
      html: `<b>${message}</b>`,
    };

    try {
      const sendMail =  transporter.sendMail(sendinfo,(error,info) =>{
          if(error){
              throw new Error(error)
          }
          return sendMail;
      })
    } catch (error) {
      return error;
    }
}
