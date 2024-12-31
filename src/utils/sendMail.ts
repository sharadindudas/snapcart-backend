import { Resend } from "resend";
import { FROM_EMAIL, RESEND_API_KEY } from "../config/config";
import { ApiResponse } from "../@types/express";

const resend = new Resend(RESEND_API_KEY);

interface SendMailProps {
    email: string;
    title: string;
    body: string;
}

export const sendMail = async ({ email, title, body }: SendMailProps): Promise<ApiResponse> => {
    const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: title,
        html: body
    });

    if (error) {
        return {
            success: false,
            message: error.message
        };
    }

    return { success: true, message: "Email is sent successfully" };
};
