export class UniqueIdentifierGenerator {
  // Function to generate a unique identifier with a 6-digit number
  public generateUniqueValue(base = 'CUCSNO', numDigits = 6): string {
    const randomDigits = this.generateRandomDigits(numDigits);
    return `${base}${randomDigits}`;
  }

  // Helper function to generate a random 6-digit number
  private generateRandomDigits(length: number): string {
    let digits = '';
    for (let i = 0; i < length; i++) {
      digits += Math.floor(Math.random() * 10).toString(); // Generate a random digit (0-9)
    }
    return digits;
  }
}
