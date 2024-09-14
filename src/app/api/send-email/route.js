// pages/api/send-email.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { subject, text, html } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'suboork100@gmail.com',
            subject,
            text,
            html,
        });

        return NextResponse.json({
            status: 200,
            message: 'Email sent successfully',
        });
    } catch (error) {
        return NextResponse.json({
            status: 400,
            message: 'Bad request',
            error: error.toString(),
        });
    }
}

export async function GET(req) {
    return NextResponse.json({
        status: 200,
        message: 'Email route',
    });
}
