import React from "react";
import ListFilter from "./ListFilter";

const ListFilterWithProps = () => {
  const propsMock = {
    handleShownCompleted: cy.stub().as("showCompleted"),
    handleShownActive: cy.stub().as("showActive"),
    handleShownAll: cy.stub().as("showAll"),
  };
  return <ListFilter {...propsMock} />;
};

describe("<ListFilter />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ListFilter />);
    cy.get('button[name="all"]').should("have.text", "All");
    cy.get('button[name="active"]').should("have.text", "Active");
    cy.get('button[name="completed"]').should("have.text", "Completed");
  });
  it("should call the proper callbacks on click All", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ListFilterWithProps />);
    cy.get('button[name="all"]').click();
    cy.get("@showAll").should("have.been.called");
  });
  it("should call the proper callbacks on click Active", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ListFilterWithProps />);
    cy.get('button[name="active"]').click();
    cy.get("@showActive").should("have.been.called");
  });
  it("should call the proper callbacks on click Completed", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ListFilterWithProps />);
    cy.get('button[name="completed"]').click();
    cy.get("@showCompleted").should("have.been.called");
  });
});
