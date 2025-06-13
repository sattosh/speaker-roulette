import '@testing-library/jest-dom';
import { vi } from 'vitest';

// LocalStorageのモック
class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value.toString();
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(index: number) {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

// Notificationのモック
Object.defineProperty(window, 'Notification', {
  value: class NotificationMock {
    static permission = 'granted';
    static requestPermission = vi.fn().mockResolvedValue('granted');

    title: string;
    options?: NotificationOptions;

    constructor(title: string, options?: NotificationOptions) {
      this.title = title;
      this.options = options;
    }
  },
});
