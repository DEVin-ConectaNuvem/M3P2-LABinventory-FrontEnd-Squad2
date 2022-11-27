describe("Testa tela inventory book itens", () => {

    it("Deve visualizar item cadastrado na tela inventário", () => {
        const email = "mcoelho@email.com"
        const password = "@abc1234"

        const url = "https://lojaibyte.vteximg.com.br/arquivos/ids/185030-1200-1200/39030-01-notebook-samsung-flash-f30-intel-n4000-4gb-ssd-64gb-13-3-full-hd-windows-10.jpg";
        const codigoDePatrimonio = "BR1234-789";
        const titulo = "Pc rosa";
        const valorProduto = "3000,00";
        const marcaProduto = "Samsung";
        const modeloProduto = "PC-F30NP530XBB";
        const descricao = "Anyway";

        // Login
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)

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
        cy.contains("p", "Item inserido com sucesso!")

        //Voltar Tela 
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();

        // Conferir dados do produto
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();
        cy.get('#search-item').type("pc rosa", {force: true})
        cy.get('.img').click();
    })

    it("Deve somar corretamente o valor de mais de um produto cadastrado e quantidade de itens", () => {      
        const email = "mcoelho@email.com"
        const password = "@abc1234"

        const url2 = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fs2.glbimg.com%2FEt0Z78geq2y9LpHy0U7e0OUHZWQ%3D%2F0x0%3A1200x630%2F984x0%2Fsmart%2Ffilters%3Astrip_icc()%2Fi.s3.glbimg.com%2Fv1%2FAUTH_08fbf48bc0524877943fe86e43087e7a%2Finternal_photos%2Fbs%2F2018%2F3%2FF%2FwN7K1ESaqCaKHclCcNAw%2Fwhatsapp-image-2018-11-26-at-20.19.38.jpeg&imgrefurl=https%3A%2F%2Fwww.techtudo.com.br%2Fnoticias%2F2018%2F11%2Fo-que-significa-pc-notebook-4k-mah-e-outros-termos-de-tecnologia.ghtml&tbnid=j_kAB9KVTu4ShM&vet=12ahUKEwiko_WKoaL7AhVqBbkGHcqxDk8QMygBegUIARDmAQ..i&docid=vMCMixvokim4iM&w=984&h=517&q=imagem%20pc&ved=2ahUKEwiko_WKoaL7AhVqBbkGHcqxDk8QMygBegUIARDmAQ";
        const codigoDePatrimonio2 = "XX1234-123";
        const titulo2 = "Pc gamer";
        const valorProduto2 = "5000,00";
        const marcaProduto2 = "Dell";
        const modeloProduto2 = "PC-3000";
        const descricao2 = "Anyway";

        // Login
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)

           // Cadastrando um novo item para verificar cards: colaboradores, itens, total e emprestados
        cy.get('.btns-div > :nth-child(3) > :nth-child(2)').click();
        cy.get(".slider").click();
        cy.get(":nth-child(1) > :nth-child(1) > .form-control").type(codigoDePatrimonio2);
        cy.get(":nth-child(1) > .col-6 > .form-control").type(titulo2);
        cy.get(".form-select").select("Eletrônicos");
        cy.get(":nth-child(2) > .col-3 > .form-control").type(valorProduto2);
        cy.get(".col-9 > .form-control").type(url2);
        cy.get(":nth-child(3) > :nth-child(1) > .form-control").type(marcaProduto2);
        cy.get(":nth-child(3) > :nth-child(2) > .form-control").type(modeloProduto2);
        cy.get("#text-area").type(descricao2);
        cy.get(".btn-info").click();
        cy.contains("p", "Item inserido com sucesso!")

        //Voltar Tela 
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();

        // Conferir dados do produto
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();
        cy.get('#search-item').type("Pc gamer", {force: true})
        cy.get('.img').click();
    })

    // it("Deve editar um item pela tela inventário", () => {

    //     const email = "mcoelho@email.com"
    //     const password = "@abc1234"

    //     // Login
    //     cy.visit("/")
    //     cy.get('#loginform > :nth-child(1) > .form-control').type(email)
    //     cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)


    //     cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click()
    //     cy.get('#search-item').type("pc rosa", {force: true})

    // //     // Editar dados do produto
    //     cy.get('.img').click();
    //     cy.get(".form-select").select("Acessórios");
    //     cy.get('.btn-info').click();
    //     cy.get('.inv-card > label').click();
    // })

    it("Deve excluir item pela tela inventario", () => {
        const email = "mcoelho@email.com"
        const password = "@abc1234"

        // Login
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();
        cy.get('#search-item').type("pc rosa", {force: true})
        cy.get('.img').click();
        cy.get('.btn-outline-danger').click();
    })
    
    it("Deve excluir outro item pela tela inventario", () => {
        const email = "mcoelho@email.com"
        const password = "@abc1234"

        // Login
        cy.visit("/")
        cy.get('#loginform > :nth-child(1) > .form-control').type(email)
        cy.get('#loginform > :nth-child(2) > .form-control').type(`${password}{enter}`)
        cy.get('.btns-div > :nth-child(1) > :nth-child(2)').click();
        cy.get('#search-item').type("Pc gamer", {force: true})
        cy.get('.img').click();
        cy.get('.btn-outline-danger').click();
    })
})
