
import { GoogleGenAI } from "@google/genai";
import { type WorkflowStep } from '../types';

// Safely access the API key to prevent "process is not defined" error in browsers.
const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

let ai: GoogleGenAI | null = null;

// Initialize the AI client only if the API key is available.
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    ai = null;
  }
} else {
  console.warn("Gemini API key not found. Using a placeholder description service.");
}

const generateGeminiDescription = async (step: WorkflowStep): Promise<string> => {
    if (!ai) {
      console.error("Gemini AI client is not initialized.");
      return generatePlaceholderDescription(step);
    }
    
    const { "Workflow State": workflowState, "Update Value": updateValue, "Only Allow Edit For": responsibleParty } = step;

    const prompt = `
    أنت خبير في الحوكمة المؤسسية وصياغة الإجراءات التشغيلية. مهمتك هي إنشاء وصف واضح وموجز لإجراء محدد ضمن سير عمل. يجب أن يكون الوصف احترافيًا، مكتوبًا باللغة العربية الرسمية، ويركز على القيمة المؤسسية للإجراء.

    بناءً على المعلومات التالية، قم بصياغة وصف إجرائي للإجراء الحالي.

    **معلومات الإجراء:**
    - اسم الإجراء (Workflow State): "${workflowState}"
    - القيمة المحدثة للحالة (Update Value): "${updateValue}"
    - المسؤول عن الإجراء (Only Allow Edit For): "${responsibleParty}"

    **متطلبات الوصف:**
    1. ابدأ بذكر المسؤول عن الإجراء (مثال: "يقوم ${responsibleParty} بـ...").
    2. وضح طبيعة العمل الذي يقوم به (مثل: مراجعة، دراسة، تنفيذ، اعتماد) بناءً على اسم الإجراء والقيمة المحدثة.
    3. اذكر السياق أو الهدف الأوسع للإجراء (مثل: ضمان التوافق مع الاستراتيجية، التحقق من الضوابط المالية، تمهيدًا للخطوة التالية).
    4. يجب أن يكون النص متماسكًا في فقرة واحدة وسهل الفهم.

    **مثال توضيحي 1:**
    - اسم الإجراء: "نموذج مقدم لطلب منح مشروع"
    - القيمة المحدثة للحالة: "قيد الدراسة"
    - المسؤول عن الإجراء: "مشرف الدراسات"
    - الوصف المطلوب: "يقوم مشرف الدراسات بمراجعة ودراسة طلب المنح المقدم، وذلك وفق توجهات المؤسسة الاستراتيجية ومعايير التقييم المعتمدة، تمهيدًا لاتخاذ القرار المناسب بشأن استكمال الإجراء."

    **مثال توضيحي 2:**
    - اسم الإجراء: "الضبط المالى و المراجعة"
    - القيمة المحدثة للحالة: "قيد التنفيذ"
    - المسؤول عن الإجراء: "المدير المالي"
    - الوصف المطلوب: "يقوم المدير المالي بمراجعة الجوانب المالية للمشروع، والتأكد من توافق الصرف مع الموازنة المعتمدة والضوابط المالية، بما يضمن سلامة الإجراءات المالية قبل الاستمرار في التنفيذ."

    **المطلوب:**
    قم بتوليد الوصف للإجراء الحالي فقط وبدون أي مقدمات أو عناوين إضافية.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating description with Gemini:", error);
        return "حدث خطأ أثناء توليد الوصف. سيتم استخدام وصف افتراضي.";
    }
};

const generatePlaceholderDescription = (step: WorkflowStep): string => {
    return `في هذه المرحلة، يقوم ${step["Only Allow Edit For"]} بتنفيذ إجراء "${step["Workflow State"]}" وتحديث الحالة إلى "${step["Update Value"]}". هذا الإجراء جزء حيوي من سير العمل لضمان التقدم السليم للمهام.`;
};


export const generateDescription = async (step: WorkflowStep): Promise<string> => {
    if (!ai) {
        return generatePlaceholderDescription(step);
    }
    return generateGeminiDescription(step);
};
