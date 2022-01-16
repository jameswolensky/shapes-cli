import { Service } from 'typedi'
import chalk from 'chalk'

@Service()
export default class NotificationService {
  error (text: string) {
    console.log(chalk.red.bold(text))
  }

  success (text: string) {
    console.log(chalk.green.bold(text))
  }

  highlight (text: string) {
    console.log(chalk.yellowBright(text))
  }
}
