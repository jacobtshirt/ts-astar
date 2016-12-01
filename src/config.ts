namespace Config {
    let _navigation: string;
    let _width: number;
    let _height: number;

    export function navigation(newNavigation?: string): string {
        if (newWidth) {
            _navigation = newNavigation;
        }
        return _navigation;
    }

    export function width(newWidth?: number): number {
        if (newWidth) {
            _width = newWidth;
        }
        return _width;
    }

    export function height(newHeight?: number): number {
      if (newHeight) {
          _height = newHeight;
      }
      return _height;
    }
}
