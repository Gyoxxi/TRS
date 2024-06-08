package com.project.trs.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailSenderService {
    private final String EMAIL = "upenn.trs@gmail.com";
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;

    public void sendActivationEmail(String toEmail, String subject, String name, String link) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("link", link);

            String htmlContent = templateEngine.process("activation-email.html", context);

            helper.setTo(toEmail);
            helper.setFrom(EMAIL);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new IllegalStateException(e);
        }
    }

    public void sendResetPasswordEmail(String toEmail, String subject, String name, String link) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("link", link);

            String htmlContent = templateEngine.process("reset-password.html", context);

            helper.setTo(toEmail);
            helper.setFrom(EMAIL);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new IllegalStateException(e);
        }
    }
}
