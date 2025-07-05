import prisma from './prisma/client'

async function test() {
  const users = await prisma.user.findMany()
  console.log(users)
}

test()