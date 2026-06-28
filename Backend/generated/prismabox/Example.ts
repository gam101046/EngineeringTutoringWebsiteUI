import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ExamplePlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    detail: t.String(),
    price: __nullable__(t.Number()),
  },
  { additionalProperties: false },
);

export const ExampleRelations = t.Object({}, { additionalProperties: false });

export const ExamplePlainInputCreate = t.Object(
  {
    name: t.String(),
    detail: t.String(),
    price: t.Optional(__nullable__(t.Number())),
  },
  { additionalProperties: false },
);

export const ExamplePlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    detail: t.Optional(t.String()),
    price: t.Optional(__nullable__(t.Number())),
  },
  { additionalProperties: false },
);

export const ExampleRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const ExampleRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const ExampleWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          detail: t.String(),
          price: t.Number(),
        },
        { additionalProperties: false },
      ),
    { $id: "Example" },
  ),
);

export const ExampleWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), name: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ name: t.String() })],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              name: t.String(),
              detail: t.String(),
              price: t.Number(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Example" },
);

export const ExampleSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      detail: t.Boolean(),
      price: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ExampleInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const ExampleOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      detail: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      price: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Example = t.Composite([ExamplePlain, ExampleRelations], {
  additionalProperties: false,
});

export const ExampleInputCreate = t.Composite(
  [ExamplePlainInputCreate, ExampleRelationsInputCreate],
  { additionalProperties: false },
);

export const ExampleInputUpdate = t.Composite(
  [ExamplePlainInputUpdate, ExampleRelationsInputUpdate],
  { additionalProperties: false },
);
