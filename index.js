// Seleniun 
const { Builder, By, Key, until } = require('selenium-webdriver');
let driver = null;

// Globais
var contaOk = false;

// Lista telefone
// Informe os numeros para ser enviados as msg
let contatos = [
    '551499999999',
    '551499999999',
    '551499999999'
];

/**
 * Delay - Ajustar o tempo conforme a lentidão da internet
 */
function delay() {
    return new Promise(resolve => setTimeout(resolve, 6000));
}

/**
 * * O navegador será iniciado e ira ficar verificando se o Wp web foi aberto na conta corretamente.
 */
async function AbrirConfigurarConta() {
    await driver.get('https://web.whatsapp.com/');
    var resp = null;
    try {
        while (resp == null) {
            resp = await driver.executeScript(function () {
                return localStorage.getItem('4pBIIM6G3coFRzvy7JHyLg==');
            });
        }
        contaOk = true;
    } finally {
        console.log("Navegador configurado");
    }
};

/**
 * Ira abrir a página atraves do Link de envio de mensagem rapida do Wp Web
 * @param {Telefone valido} telefone 
 * @param {Mensagem para ser anexada direto no input de envio} mensagem 
 */
async function EnviarMensagem(telefone, mensagem) {
    try {
        console.log('Enviar para: ' + telefone);
        await driver.get('https://web.whatsapp.com/send?phone=' + telefone + '&text=' + mensagem + '');
        console.log("Agurdando carregamento completo da página");
        setTimeout(() => {
            driver.findElement(By.xpath('//html/body/div[1]/div/div/div[4]/div/footer/div[1]/div[2]/div/div[2]')).sendKeys(Key.ENTER);
        }, 3000);
        await delay();
        return true;
    } finally {
        console.log("Conversa aberta e mensagem enviada");
    }
}

/**
 * Iniciar aplicação
 */
(async function IniciarApp() {
    // Setar Driver do Chrome
    driver = await new Builder().forBrowser('chrome').build();
    // Configurar Navegador e conta
    (driver != null) ? await AbrirConfigurarConta() : console.log('Aconteceu algum erro no builder do Chrome');
    // Execultar envio de mensagens
    if (contaOk) {
        for (const [idlx, cont] of contatos.entries()) {
            var resp = await EnviarMensagem(cont, 'Ola, Tudo bom?');
            console.log(resp);
        }
    } else {
        console.log('Não foi configurada a conta corretamente');
    }
})();
