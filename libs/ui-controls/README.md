# @coreng/angular-ui-controls

This library defines all shared ui modules for all APS angular apps.

## Structure

- <feature> (dir): shared ui module.
  - feature.dto.ts
  - feature.model.ts
  - feature.component.ts
  - feature.service.ts
  - feature.module.ts
- enums (dir).
- helpers (dir): shared helper classes (stateful classes).
- utils (dir): shared static utility classes.
- index.ts: export \* from internal folders.

## Difference between model and dto

- Model is a class, you can pass an interface type to the constructor as data.
- Dto (Data Transfer Object) is an interface. E.g., request, response

## Difference between helper and utils

- A Utility class is understood to only have static methods and be stateless. You would not create an instance of such a class.
- A Helper can be a utility class or it can be stateful or require an instance be created. I would avoid this if possible.

## Rules for index.ts files

- `folder/index.ts` is just export internal class, interface, services, module from folders.

```
export { AModel } from './models/a.model';
export { AModule } from './a.module.ts';
```

- `src/index.ts` is just export from folders

```
export * from 'a-folder';
export * from 'b-folder';
```
