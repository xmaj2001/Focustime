import * as bcrypt from 'bcrypt';

export class GenerateAdapter {
  /**
   * Gera um hash para a senha fornecida.
   * @param password - A senha a ser hash.
   * @param saltRounds - O número de salt rounds a serem usados (padrão: 10).
   * @returns O hash da senha.
   */
  static async hashPassword(
    password: string,
    saltRounds: number = 10,
  ): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Compara uma senha fornecida com um hash armazenado.
   * @param password - A senha a ser comparada.
   * @param hash - O hash da senha armazenada.
   * @returns Um booleano indicando se as senhas correspondem.
   */
  static async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
