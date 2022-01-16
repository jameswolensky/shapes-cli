#! /usr/bin/env node
/* eslint-disable */

/**
 * TSConfig path resolution in production
 */
import 'module-alias/register'
import { addAliases } from 'module-alias'
import * as path from 'path'
addAliases({
  '@': path.resolve(__dirname)
})
/*****/
import 'reflect-metadata'
import { Container } from 'typedi'
import list from '@/commands/list'
import remove from '@/commands/remove'
import destroy from '@/commands/destroy'
import point from '@/commands/point'
import file from '@/commands/file'
import CircleService from '@/services/CircleService'
import EllipseService from '@/services/EllipseService'
import DonutService from '@/services/DonutService'
import TriangleService from '@/services/TriangleService'
import SquareService from '@/services/SquareService'
import RectangleService from '@/services/RectangleService'
import { parseNegativeNumbersAndStringsToFloat, parseCommandForNegativeNumbers } from '@/global/helpers'

const vorpal = require('vorpal')()
vorpal.delimiter('shapes >').show()

vorpal.command('list', 'Lists all shapes').action((args: any, callback: any) => {
  list()
  callback()
})

vorpal.command('file <filepath>', 'Add shape(s) from file in the web server directory').action((args: any, callback: any) => {
  file(args.filepath)
  callback()
})

vorpal.command('remove <args...>', 'Remove shape(s) by uuid').action((args: any, callback: any) => {
  remove(args.args)
  callback()
})

vorpal.command('destroy', 'Remove all shapes').action((args: any, callback: any) => {
  destroy()
  callback()
})

vorpal
  .command('point <args...>', 'List all shapes that are within point (x, y)')
  .parse(parseCommandForNegativeNumbers)
  .action(function (args: any, callback: any) {
    point(parseNegativeNumbersAndStringsToFloat(args.args))
    callback()
  })

vorpal
  .command('circle <args...>', 'Add a circle\n\nArguments:\n1. Center X\n2. Center Y\n3. Radius\n')
  .parse(parseCommandForNegativeNumbers)
  .action(function (args: any, callback: any) {
    Container.get(CircleService).add(parseNegativeNumbersAndStringsToFloat(args.args))
    callback()
  })

vorpal
  .command('ellipse <args...>', 'Add an ellipse\n\nArguments:\n1. Center X\n2. Center Y\n3. Axis1\n4. Axis2\n')
  .parse(parseCommandForNegativeNumbers)
  .action(function (args: any, callback: any) {
    Container.get(EllipseService).add(parseNegativeNumbersAndStringsToFloat(args.args))
    callback()
  })

vorpal
  .command('donut <args...>', 'Add a donut\n\nArguments:\n1. Center X\n2. Center Y\n3. Radius1\n4. Radius2\n')
  .parse(parseCommandForNegativeNumbers)
  .action(function (args: any, callback: any) {
    Container.get(DonutService).add(parseNegativeNumbersAndStringsToFloat(args.args))
    callback()
  })

vorpal
  .command('square <args...>', 'Add a square\n\nArguments:\n1. Top-Right X\n2. Top-Right Y\n3. Length\n')
  .parse(parseCommandForNegativeNumbers)
  .action(function (args: any, callback: any) {
    Container.get(SquareService).add(parseNegativeNumbersAndStringsToFloat(args.args))
    callback()
  })

vorpal
  .command('rectangle <args...>', 'Add a rectangle\n\nArguments:\n1. Top-Right X\n2. Top-Right Y\n3. Length1\n4. Length2\n')
  .parse(parseCommandForNegativeNumbers)
  .action(function (args: any, callback: any) {
    Container.get(RectangleService).add(parseNegativeNumbersAndStringsToFloat(args.args))
    callback()
  })

vorpal
  .command('triangle <args...>', 'Add a triangle\n\nArguments:\n1. Vertex0 X\n2. Vertex0 Y\n3. Vertex1 X\n4. Vertex1 Y\n5. Vertex2 X\n 6. Vertex2 Y')
  .parse(parseCommandForNegativeNumbers)
  .action(function (args: any, callback: any) {
    Container.get(TriangleService).add(parseNegativeNumbersAndStringsToFloat(args.args))
    callback()
  })
