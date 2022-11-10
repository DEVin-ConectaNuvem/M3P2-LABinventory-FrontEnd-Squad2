describe("Testando Tela de cadastro de itens", () => {
    it("Deve retornar que os campos é obrigatório", () => {
        const nome = 'Kauã Kirchner de Souza';
        const email = "kauakirchner@email.com";
        const senha = 'kaua1234';

        cy.visit("/");
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(nome);
        cy.get('#registerform > :nth-child(2) > .form-control').type(email);
        cy.get(':nth-child(3) > .form-control').type(senha);
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`);
        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(".btn-info").click();
        cy.contains("span", "Campo obrigatório.")
    })
    
    it("Deve retornar que o código de patrimômio é inválido", () => {
        const nome = 'Kauã Kirchner de Souza';
        const email = "kauakirchner@email.com";
        const senha = 'kaua1234';
        const coidigoDePatrimonioInvalido = "9910";

        cy.visit("/");
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(nome);
        cy.get('#registerform > :nth-child(2) > .form-control').type(email);
        cy.get(':nth-child(3) > .form-control').type(senha);
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`);
        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > :nth-child(1) > .form-control").type(coidigoDePatrimonioInvalido);
        cy.get(".btn-info").click();
        cy.contains("span", "Código inválido.")
    })

    it("Deve retornar que o Valor do produto é inválido", () => {
        const nome = 'Kauã Kirchner de Souza';
        const email = "kauakirchner@email.com";
        const senha = 'kaua1234';
        const valorInvalido = "0,5";

        cy.visit("/");
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(nome);
        cy.get('#registerform > :nth-child(2) > .form-control').type(email);
        cy.get(':nth-child(3) > .form-control').type(senha);
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`);
        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(2) > .col-3 > .form-control").type(valorInvalido);
        cy.get(".btn-info").click();
        cy.contains("span", "Valor inválido.")
    })
    it("Deve retornar que a url da imagem do produto é inválida", () => {
        const nome = 'Kauã Kirchner de Souza';
        const email = "kauakirchner@email.com";
        const senha = 'kaua1234';
        const urlInvalida = "stackoverflow.com";

        cy.visit("/");
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(nome);
        cy.get('#registerform > :nth-child(2) > .form-control').type(email);
        cy.get(':nth-child(3) > .form-control').type(senha);
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`);
        cy.get(".btns-div > :nth-child(3) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(".col-9 > .form-control").type(urlInvalida);
        cy.get(".btn-info").click();
        cy.contains("span", "URL inválida.")
    })

    it("Deve Cadastrar item com sucesso", () => {
        const nome = 'Kauã Kirchner de Souza';
        const email = "kauakirchner@email.com";
        const senha = 'kaua1234';
        const url = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fs2.glbimg.com%2FEt0Z78geq2y9LpHy0U7e0OUHZWQ%3D%2F0x0%3A1200x630%2F984x0%2Fsmart%2Ffilters%3Astrip_icc()%2Fi.s3.glbimg.com%2Fv1%2FAUTH_08fbf48bc0524877943fe86e43087e7a%2Finternal_photos%2Fbs%2F2018%2F3%2FF%2FwN7K1ESaqCaKHclCcNAw%2Fwhatsapp-image-2018-11-26-at-20.19.38.jpeg&imgrefurl=https%3A%2F%2Fwww.techtudo.com.br%2Fnoticias%2F2018%2F11%2Fo-que-significa-pc-notebook-4k-mah-e-outros-termos-de-tecnologia.ghtml&tbnid=j_kAB9KVTu4ShM&vet=12ahUKEwiko_WKoaL7AhVqBbkGHcqxDk8QMygBegUIARDmAQ..i&docid=vMCMixvokim4iM&w=984&h=517&q=imagem%20pc&ved=2ahUKEwiko_WKoaL7AhVqBbkGHcqxDk8QMygBegUIARDmAQ";
        const codigoDePatrimonio = "XX9999-999";
        const titulo = "Pc gamer";
        const valorProduto = "9999,99";
        const marcaProduto = "Dell";
        const modeloProduto = "PC-3000";
        const descricao = "Anyway";

        cy.visit("/");
        cy.get('.criar-conta > .btn').click();
        cy.get('#registerform > :nth-child(1) > .form-control').type(nome);
        cy.get('#registerform > :nth-child(2) > .form-control').type(email);
        cy.get(':nth-child(3) > .form-control').type(senha);
        cy.get('.modal-footer > .btn-info').click();
        cy.get('#loginform > :nth-child(1) > .form-control').type(email);
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${senha}{enter}`);
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
        cy.contains("p", "Item salvo com sucesso.")
    })
})