describe("Testa tela inventory book colaboradores e emprestimos", () => {  
    
    it("Deve visualizar colaborador cadastrado na tela inventário", () => {
        const email = "julia@email.com"
        const password = "abcd1234"
        const nomeCompleto = "Julia Moura";
        const dataNascimento = "1998-07-14";
        const telefone = "48984995578";
        const emailColaborador = "julia@gmail.com";
        const cep = "16201169";
        const numeroDaCasa = "992";
        const complemento = "anyway";
        const pontoDeReferencia = "Casa";

        //Login
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
        cy.contains("p", "Inventario")

        // Cadastrando um colaborador para verificar cards: colaboradores, itens, total e emprestados
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto);
        cy.get(":nth-child(2) > .form-select").select("Feminino");
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(dataNascimento);
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(telefone);
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailColaborador)
        cy.get(":nth-child(3) > .form-select").select("Front-end dev");
        cy.get(":nth-child(4) > .col-4 > .form-control").type(cep);
        cy.get(":nth-child(5) > .col-2 > .form-control").type(numeroDaCasa);
        cy.get(":nth-child(6) > :nth-child(1) > .form-control").type(complemento);
        cy.get(":nth-child(6) > :nth-child(3) > .form-control").type(pontoDeReferencia);
        cy.get(".btn-info").click();
        cy.contains("p", "Dados do colaborador salvos com sucesso.");

        //Voltar Tela 
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();

    })

    it("Deve visualizar mais de um colaborador cadastrado na tela inventário", () => {
        const email = "julia@email.com"
        const password = "abcd1234"

        const nomeCompleto = "Julia Moura";
        const dataNascimento = "1998-07-14";
        const telefone = "48984995578";
        const emailColaborador = "julia@gmail.com";
        const cep = "16201169";
        const numeroDaCasa = "992";
        const complemento = "anyway";
        const pontoDeReferencia = "Casa";

        const nomeCompleto2 = "Kauã Kirchner de Souza";
        const dataNascimento2 = "2005-01-07";
        const telefone2 = "48984995578";
        const emailColaborador2 = "kaua@email.com";
        const cep2 = "88010-400";
        const numeroDaCasa2 = "96";
        const complemento2 = "anyway";
        const pontoDeReferencia2 = "Árvores";

        //Login
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
        cy.contains("p", "Inventario")

        // Cadastrando um colaborador para verificar cards: colaboradores, itens, total e emprestados
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto);
        cy.get(":nth-child(2) > .form-select").select("Feminino");
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(dataNascimento);
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(telefone);
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailColaborador)
        cy.get(":nth-child(3) > .form-select").select("Front-end dev");
        cy.get(":nth-child(4) > .col-4 > .form-control").type(cep);
        cy.get(":nth-child(5) > .col-2 > .form-control").type(numeroDaCasa);
        cy.get(":nth-child(6) > :nth-child(1) > .form-control").type(complemento);
        cy.get(":nth-child(6) > :nth-child(3) > .form-control").type(pontoDeReferencia);
        cy.get(".btn-info").click();
        cy.contains("p", "Dados do colaborador salvos com sucesso.");

        //Voltar Tela 
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();

        // Cadastrando outro colaborador para verificar cards: colaboradores, itens, total e emprestados
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto2);
        cy.get(":nth-child(2) > .form-select").select("Masculino");
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(dataNascimento2);
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(telefone2);
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailColaborador2)
        cy.get(":nth-child(3) > .form-select").select("Front-end dev");
        cy.get(":nth-child(4) > .col-4 > .form-control").type(cep2);
        cy.get(":nth-child(5) > .col-2 > .form-control").type(numeroDaCasa2);
        cy.get(":nth-child(6) > :nth-child(1) > .form-control").type(complemento2);
        cy.get(":nth-child(6) > :nth-child(3) > .form-control").type(pontoDeReferencia2);
        cy.get(".btn-info").click();
        cy.contains("p", "Dados do colaborador salvos com sucesso.");

        //Voltar Tela 
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();

    })

    it("Deve visualizar item emprestado na tela inventário", () => {
        const email = "julia@email.com"
        const password = "abcd1234"

        const nomeCompleto = "Julia Moura";
        const dataNascimento = "1998-07-14";
        const telefone = "48984995578";
        const emailColaborador = "julia@gmail.com";
        const cep = "16201169";
        const numeroDaCasa = "992";
        const complemento = "anyway";
        const pontoDeReferencia = "Casa";

        const url = "https://lojaibyte.vteximg.com.br/arquivos/ids/185030-1200-1200/39030-01-notebook-samsung-flash-f30-intel-n4000-4gb-ssd-64gb-13-3-full-hd-windows-10.jpg";
        const codigoDePatrimonio = "BR1234-789";
        const titulo = "Pc rosa";
        const valorProduto = "3000,00";
        const marcaProduto = "Samsung";
        const modeloProduto = "PC-F30NP530XBB";
        const descricao = "Anyway";


        //Login
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
        cy.contains("p", "Inventario")

        // Cadastrando um colaborador para verificar cards: colaboradores, itens, total e emprestados
        cy.get(".btns-div > :nth-child(2) > :nth-child(2)").click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > .col-6 > .form-control").type(nomeCompleto);
        cy.get(":nth-child(2) > .form-select").select("Feminino");
        cy.get(":nth-child(1) > :nth-child(3) > .form-control").type(dataNascimento);
        cy.get(":nth-child(2) > :nth-child(1) > .form-control").type(telefone);
        cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(emailColaborador)
        cy.get(":nth-child(3) > .form-select").select("Front-end dev");
        cy.get(":nth-child(4) > .col-4 > .form-control").type(cep);
        cy.get(":nth-child(5) > .col-2 > .form-control").type(numeroDaCasa);
        cy.get(":nth-child(6) > :nth-child(1) > .form-control").type(complemento);
        cy.get(":nth-child(6) > :nth-child(3) > .form-control").type(pontoDeReferencia);
        cy.get(".btn-info").click();
        cy.contains("p", "Dados do colaborador salvos com sucesso.");

        // Cadastrando um item para verificar cards: colaboradores, itens, total e emprestados
        cy.get('.btns-div > :nth-child(3) > :nth-child(2)').click();
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

        //Voltar Tela emprestimo
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();

        //Realizar emprestimo
        cy.get('.btns-div > :nth-child(3) > :nth-child(3)').click()
        cy.get('#search-item').type("BR1234-789")
        cy.get('.form-select').first().select('Julia Moura')

        //Voltar Tela emprestimo
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();

        // Desfaço emprestimo - COM ERRO ao colocar item disponível
        cy.get('.btns-div > :nth-child(3) > :nth-child(3)').click()
        cy.get('#search-item').type("BR1234-789")
        cy.get('.form-select').first().select('Item disponível')

        // Voltar Tela emprestimo
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();
    })
})
