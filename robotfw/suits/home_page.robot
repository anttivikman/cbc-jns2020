*** Settings ***
Library     SeleniumLibrary

*** Variables ***
${BROWSER}      %{BROWSER}

***Test Cases ***
Test Home Page Title
    Open Browser    http://frontend
    ${title}=       Get Title
    Should Be Equal     Sample Codes    ${title}

Test Home Page Greeting
    Open Browser    http://frontend
    Element Should Contain      id:root     Tämä on koti
