export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  color: string;
  order: number;
}

export interface PipelineSettings {
  stages: PipelineStage[];
  defaultStage: string; // ID of the default stage for new leads
} 