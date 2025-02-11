import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type validateResponse =
  | {
      ok: false;
      response: {
        tasks: [];
        message: string;
      };
    }
  | {
      ok: true;
      user: {
        id: string;
        tasks: {
          id: string;
          title: string;
          details: string | null;
          completed: boolean;
        }[];
      };
    };

export const validateUser = async (id: string | null): Promise<validateResponse> => {
  if (!id) {
    return {
      ok: false,
      response: {
        tasks: [],
        message: 'Missing user ID',
      },
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        tasks: {
          select: {
            id: true,
            title: true,
            completed: true,
            details: true,
          },
        },
      },
    });

    if (!user) {
      return {
        ok: false,
        response: {
          tasks: [],
          message: 'Invalid user ID',
        },
      };
    }

    return {
      ok: true,
      user,
    };
  } catch {
    return {
      ok: false,
      response: {
        tasks: [],
        message: 'Server Error',
      },
    };
  }
};
