import { handleHelp } from "@/lib/arby-help/handler";
import { HELP_INSTRUCTIONS } from "@/lib/arby-help/instructions";

export async function POST(request: Request) {
  return handleHelp(request, process.env.ANTHROPIC_API_KEY, HELP_INSTRUCTIONS);
}
