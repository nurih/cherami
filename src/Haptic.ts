/**
 * Haptic - on supported device, allows for creating haptic effect or vibrating.
 */
export default class Haptic {
  readonly enabled: boolean;

  constructor() {
    this.enabled = Boolean(navigator.vibrate)
  }

  /**
   * Vibrates according to the sequence supplied.
   * 
   * @param [vibrationSequenceMs=[400, 300, 800]] - 
   *  An optional sequence of alternating [on,off,on,off...] periods 
   *  specified in milliseconds. Defaults to [400,300,800].
   */
  vibrate(vibrationSequenceMs: number[] = [400, 300, 800]): void {
    if (this.enabled) {
      navigator.vibrate(vibrationSequenceMs);
      navigator.vibrate(0);
    }
  }
}