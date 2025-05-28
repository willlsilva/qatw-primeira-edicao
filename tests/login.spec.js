import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';

import { LoginPage } from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';

test('nao deve logar quando codigo de autenticacao for invalido', async ({ page }) => {
const loginPage = new LoginPage(page)


const usuario = {
  cpf: '00000014141',
  senha: '147258'
}

await loginPage.acessaPagina()
await loginPage.informaCpf(usuario.cpf)
await loginPage.informaSenha(usuario.senha)
await loginPage.informe2FA('123456')

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('deve acessar a conta do usuário', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const dashpage = new DashPage(page)
  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

    await loginPage.acessaPagina()
    await loginPage.informaCpf(usuario.cpf)
    await loginPage.informaSenha(usuario.senha)

    await page.waitForTimeout(2000)
    const codigo = await obterCodigo2FA()
    await loginPage.informe2FA(codigo)

    await page.waitForTimeout(3000)
     expect(await dashpage.obterSaldo()).toHaveText('R$ 5.000,00')

  });

 // test('deve acessar a conta do usuário', async ({ page }) => {

    
  //  const usuario = {
 //     cpf: '00000014141',
 //     senha: '147258'
//    }
  
 //     await loginPage.acessaPagina()
 //     await loginPage.informaCpf(usuario.cpf)
 //     await loginPage.informaSenha(usuario.senha)
  
 //     await page.waitForTimeout(2000)
  //    const codigo = await obterCodigo2FA()
  //    await loginPage.informe2FA(codigo)
  
 //     await page.waitForTimeout(3000)
  //     expect(await loginPage.obterSaldo()).toHaveText('R$ 5.000,00')
  
   // });