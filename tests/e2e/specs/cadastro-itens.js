describe("Testando Tela de cadastro de itens", () => {
    const email = "mcoelho@email.com"
    const senha = "@abc1234"

    beforeEach(() => {
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`)
    })

    afterEach(() => {
        cy.get('.btns-div > :nth-child(1) > :nth-child(3)').click()
    })

    it("Deve retornar que os campos é obrigatório", () => {
        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(".btn-info").click();
        cy.contains("span", "Campo obrigatório.")
    })
    
    it("Deve retornar que o código de patrimômio é inválido", () => {
        const codigoDePatrimonioInvalido = "XD444";    

        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > :nth-child(1) > .form-control").type(codigoDePatrimonioInvalido);
        cy.get(".btn-info").click();
        cy.contains("span", "Código inválido.")
    })
    
    it("Deve retornar que o Valor do produto é inválido", () => {
        const valorInvalido = "0,5";
        
        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(2) > .col-3 > .form-control").type(valorInvalido);
        cy.get(".btn-info").click();
        cy.contains("span", "Valor inválido.")
    })
    
    it("Deve retornar que a url da imagem do produto é inválida", () => {
        const urlInvalida = "stackoverflow.com";    

        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(".col-9 > .form-control").type(urlInvalida);
        cy.get(".btn-info").click();
        cy.contains("span", "URL inválida.")
    })

    it("Deve Cadastrar item com sucesso", () => {
        const url = "https://images.kabum.com.br/produtos/fotos/309501/pc-gamer-skul-3000-intel-quad-core-i3-10100f-rgb-amd-radeon-rx-550-8gb-ddr4-ssd-240gb-linux-preto-g4704-120630_1644605124_original.jpg";
        const codigoDePatrimonio = "XX9999-842";
        const titulo = "Pc gamer";
        const valorProduto = "9999,99";
        const marcaProduto = "Dell";
        const modeloProduto = "PC-3000";
        const descricao = "Anyway";

        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();

        cy.get(":nth-child(1) > :nth-child(1) > .form-control").type(codigoDePatrimonio);
        cy.get(":nth-child(1) > .col-6 > .form-control").type(titulo);
        cy.get(".form-select").select("Eletrônicos");
        cy.get(":nth-child(2) > .col-3 > .form-control").type(valorProduto);
        cy.get(".col-9 > .form-control").type(url);
        cy.get(":nth-child(3) > :nth-child(1) > .form-control").type(marcaProduto);
        cy.get(":nth-child(3) > :nth-child(2) > .form-control").type(modeloProduto);
        cy.get("#text-area").type(descricao);
        cy.get(".btn-info").click();
        cy.contains("p", "Item inserido com sucesso!")
    })
})
