export interface Operation {
  id: number;
  amount: number;
  fraudProbability: number;
  isFraudFlag: number;
  merchant: string;
}
