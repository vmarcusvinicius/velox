export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    const { resposta, nome } = req.body

    let embed = {}
    let mensagemTexto = "" // Variável para o texto fora do embed (que dá o ping)

    // COLE O SEU ID DO DISCORD AQUI (Apenas os números, entre as aspas)
    const MEU_ID_DISCORD = "334355498721738763"

    if (resposta === 'sim') {
        embed = {
            title: "💛 Pedido respondido!",
            description: "**Ela disse SIM!**\n\nAgora é oficial 😭💛",
            color: 16766720
        }
        // É isso aqui que faz a marcação normal (ping) no Discord
        mensagemTexto = `<@${MEU_ID_DISCORD}> CORRE AQUI! ELA DISSE SIM!!! 🎉💛`
    }

    if (resposta === 'talvez') {
        embed = {
            title: "🤔 Pedido em análise...",
            description: "Ela mandou um *talvez*...\n\nAinda tem chance 👀",
            color: 16776960
        }
        // Se quiser que ele te marque no talvez também, basta descomentar a linha abaixo:
        // mensagemTexto = `<@${MEU_ID_DISCORD}> OPA! Ela clicou no Talvez!`
    }

    if (resposta === 'nao') {
        embed = {
            title: "💔 Pedido recusado...",
            description: "Ela disse não...\n\nF no chat 😔",
            color: 16711680
        }
    }

    const payload = {
        // Envia o ping junto com a mensagem, se existir
        content: mensagemTexto !== "" ? mensagemTexto : null,
        embeds: [
            {
                ...embed,
                fields: [
                    {
                        name: "👤 Quem respondeu",
                        value: nome || "Nanda",
                        inline: true
                    },
                    {
                        name: "📌 Resposta",
                        value: resposta.toUpperCase(),
                        inline: true
                    }
                ],
                footer: {
                    text: "Kt + Nanda"
                },
                timestamp: new Date()
            }
        ]
    }

    await fetch("https://discord.com/api/webhooks/1485380165579313246/O_TKlK3aa95hITkINn6BY4OpNrT9mi3f9e6lEED_HLQ_XUCrnACxqvW42yAvHTx-N2f8", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    res.status(200).json({ ok: true })
}