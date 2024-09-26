describe("todo list app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.intercept("POST", "http://localhost:3001/login", {
      statusCode: 200,
      body: {
        email: "user@email.com",
      },
    });

    cy.intercept("GET", "http://localhost:3001/todos", {
      statusCode: 200,
      body: [
        {
          name: "task 1",
          check: false,
          createdAt: "2024-09-18T14:57:25.179Z",
          id: 1,
          ellapsedMinutes: 23,
        },
        {
          name: "task 2",
          check: false,
          createdAt: "2024-09-23T02:24:48.965Z",
          id: 2,
        },
      ],
    });

    cy.get('input[placeholder="Email address"]').type("z@email.com");
    cy.get('input[placeholder="Password"]').type("12334546");

    cy.get('button[name="login"]').click();
  });

  it("displays two todo items by default", () => {
    cy.get("li", { timeout: 1000 }).should("have.length", 2);
    cy.get("li").first().should("include.text", "task 1");
    cy.get("li").last().should("include.text", "task 2");
  });

  it("can add new todo items", () => {
    const newItem = "task 3";

    cy.intercept("POST", "http://localhost:3001/todos", {
      statusCode: 200,
      body: {
        name: newItem,
        check: false,
        createdAt: "2024-09-18T14:57:25.179Z",
        id: 3,
        ellapsedMinutes: 23,
      },
    });

    cy.get('input[placeholder="Create a new task..."').type(
      `${newItem}{enter}`
    );
  });

  it("should task as completed", () => {
    cy.intercept("PUT", "http://localhost:3001/todos/1", {
      statusCode: 200,
      body: {
        name: "task 1",
        check: true,
        createdAt: "2024-09-18T14:57:25.179Z",
        id: 1,
        ellapsedMinutes: 23,
      },
    });

    cy.contains("task 1")
      .parent()
      .find("input[type=checkbox]")
      .check({ force: true });

    cy.contains("task 1")
      .parent()
      .find("input[type=checkbox]")
      .should("be.checked");
  });

  context("with a checked task", () => {
    beforeEach(() => {
      cy.intercept("PUT", "http://localhost:3001/todos/1", {
        statusCode: 200,
        body: {
          name: "task 1",
          check: true,
          createdAt: "2024-09-18T14:57:25.179Z",
          id: 1,
          ellapsedMinutes: 23,
        },
      });

      cy.contains("task 1")
        .parent()
        .find("input[type=checkbox]")
        .check({ force: true });
    });

    it("can filter for uncompleted tasks", () => {
      cy.contains("Active").click();

      cy.get("li")
        .should("have.length", 1)
        .first()
        .should("include.text", "task 2");

      cy.contains("task 1").should("not.exist");
    });

    it("can filter for completed tasks", () => {
      cy.contains("Completed").click();
      cy.get("li")
        .should("have.length", 1)
        .first()
        .should("include.text", "task 1");

      cy.contains("task 2").should("not.exist");
    });

    it("can delete all completed tasks", () => {
      cy.contains("Clear Completed").click();

      cy.intercept("DELETE", "http://localhost:3001/todos/1", {
        statusCode: 200,
      });

      cy.get("li")
        .should("have.length", 1)
        .should("not.include.text", "task 1");
    });
  });
});
