import type { SvgIconTypeMap } from "@material-ui/core";
import type { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface NavbarMenu {
    iconType: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    items: { [key: string]: string }[];
    menuName: string;
    name?: string;
}
