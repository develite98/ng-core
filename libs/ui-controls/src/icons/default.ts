import * as allIcons from '@ant-design/icons-angular/icons';

import { IconDefinition } from '@ant-design/icons-angular';

export const DEFAULT_ICONS: IconDefinition[] = Object.keys(allIcons).map(
  (key: string) => (allIcons as Record<string, IconDefinition>)[key]
);
