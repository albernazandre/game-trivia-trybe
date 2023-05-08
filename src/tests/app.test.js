import React from "react";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from '../App';


describe('teste de cobertura da página de login', () => {
    it('testa se os campos de email e nome aparecem e validação do botão', () => {
        renderWithRouterAndRedux(<App/>);
        const emailInput = screen.getByTestId('input-gravatar-email');
        const nameInput = screen.getByTestId('input-player-name');
        const buttonPlay = screen.getByTestId('btn-play');
        const configButton = screen.getByTestId('btn-settings');
        const arrayToCheck = [emailInput, nameInput,buttonPlay, configButton];
        arrayToCheck.forEach((iten) => expect(iten).toBeVisible());
    })
    it('testa a validação do botão play', () => {
        renderWithRouterAndRedux(<App/>);
        const emailInput = screen.getByTestId('input-gravatar-email');
        const nameInput = screen.getByTestId('input-player-name');
        const buttonPlay = screen.getByTestId('btn-play');
        userEvent.type(emailInput, 'prmval')
        userEvent.type(nameInput, 'Pedro')
        expect(buttonPlay).toBeDisabled();
        userEvent.type(emailInput, '@gmail.com')
        while (nameInput.value !== '') {
            userEvent.type(nameInput, '{backspace}');
          }
        expect(buttonPlay).toBeDisabled();
        userEvent.type(nameInput, 'Pedro')
        expect(buttonPlay).not.toBeDisabled();
    })
    it('teste do botão para a pagina de opções', () => {
        const { history } = renderWithRouterAndRedux(<App/>);
        const configButton = screen.getByTestId('btn-settings');
        userEvent.click(configButton)
        expect(history.location.pathname).toBe('/setting')
    })
    it('teste do botão playcom mock de localstorage', async () => {
        jest.spyOn(Storage.prototype,'getItem').mockResolvedValue('123');
        const { history } = renderWithRouterAndRedux(<App/>);
        const emailInput = screen.getByTestId('input-gravatar-email');
        const nameInput = screen.getByTestId('input-player-name');
        const buttonPlay = screen.getByTestId('btn-play');
        userEvent.type(emailInput, 'prmval@gmail.com')
        userEvent.type(nameInput, 'Pedro')
        userEvent.click(buttonPlay);
        await waitFor(() => {
            expect(history.location.pathname).toBe('/')
        })
    })
    it('teste do botão play sem mock de localstorage', async () => {
        const { history } = renderWithRouterAndRedux(<App/>);
        const emailInput = screen.getByTestId('input-gravatar-email');
        const nameInput = screen.getByTestId('input-player-name');
        const buttonPlay = screen.getByTestId('btn-play');
        userEvent.type(emailInput, 'prmval@gmail.com')
        userEvent.type(nameInput, 'Pedro')
        userEvent.click(buttonPlay);
        await waitFor(() => {
            expect(history.location.pathname).toBe('/game')
        })
    })
})