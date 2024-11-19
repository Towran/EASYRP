const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();

// Configuração de upload de arquivos com Multer
const upload = multer({ dest: "uploads/" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint para o formulário
app.post("/enviar-formulario", upload.array("arquivos"), async (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    const arquivos = req.files;

    try {
        // Configurar transporte de e-mail
        const transporter = nodemailer.createTransport({
            service: "Gmail", // Use o serviço de e-mail desejado
            auth: {
                user: "seu-email@gmail.com", // Substitua pelo seu e-mail
                pass: "sua-senha-de-app"     // Use uma senha de app ou token
            }
        });

        // Configurar o e-mail
        const mailOptions = {
            from: email,
            to: "destinatario@example.com", // Substitua pelo e-mail que receberá as mensagens
            subject: assunto,
            text: `Nome: ${nome}\nE-mail: ${email}\nMensagem:\n${mensagem}`,
            attachments: arquivos.map(file => ({
                filename: file.originalname,
                path: file.path
            }))
        };

        // Enviar e-mail
        await transporter.sendMail(mailOptions);

        // Responder ao cliente
        res.status(200).send("Formulário enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar o e-mail:", error);
        res.status(500).send("Erro ao enviar o formulário.");
    }
});

// Servir o formulário (opcional)
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
