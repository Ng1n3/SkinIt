import { TypeOf, array, object, string } from "zod";

export const createProductSchema = object({
  body: object({
    // seller: string({
    //   required_error: "sellers id is required",
    // }),
    name: string({
      required_error: "please give the item a name",
    }),
    price: string({
      required_error: "enter a number",
    }),
    units: string({
      required_error: "enter the number of units",
    }),
    description: string({
      required_error: "Enter a description",
    }),
    genre: array(
      string({
        required_error: "Genre should be an array of genres",
      })
    ).nonempty("genre cannot be empty"),
  }),
});

export const updateProductSchema = object({
  body: object({
    name: string({
      required_error: "please give the item a name",
    }).optional(),
    price: string({
      required_error: "enter a number",
    }).optional(),
    units: string({
      required_error: "enter the number of units",
    }).optional(),
    description: string({
      required_error: "Enter a description",
    }).optional(),
    // seller: string({
    //   required_error: "sellers id is required",
    // }),
    genre: array(
      string({
        required_error: "Genre should be an array of genres",
      })
    )
      .nonempty("genre cannot be empty")
      .optional(),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
