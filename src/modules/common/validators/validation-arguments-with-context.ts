export interface ValidationArgumentsWithContext {
  /**
   * Validating value.
   */
  value: any;
  /**
   * Constraints set by this validation type.
   */
  constraints: any[];
  /**
   * Name of the target that is being validated.
   */
  targetName: string;
  /**
   * Object that is being validated.
   */
  object: Record<string, any>;
  /**
   * Name of the object's property being validated.
   */
  property: string;
}
