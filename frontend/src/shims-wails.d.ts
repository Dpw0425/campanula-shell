// src/shims-wails.d.ts
import { Events } from '@wailsapp/runtime';

declare global {
    interface Window {
        runtime: {
            WindowMinimise: () => void;
            WindowMaximise: () => void;
            WindowUnmaximise: () => void;
            WindowIsMaximised: () => Promise<boolean>;
            Quit: () => void;
            Events: Events; // 添加 Events 类型
        };
    }
}