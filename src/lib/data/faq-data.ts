export interface FaqItem {
  id: number
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: 1,
    question: 'Why should I choose disposable endoscopic instruments over reusable ones?',
    answer: "Disposable endoscopic instruments reduce the risk of cross-contamination and potential infections, which is a significant concern in modern endoscopy1. Even thorough disinfection processes may not completely eliminate the risk of disease transmission1. Single-use instruments also eliminate the costs associated with sterilization, disinfectants, and autoclaves"
  },
  {
    id: 2,
    question: 'What types of disposable endoscopic accessories does Alton offer?',
    answer: "Alton provides a wide range of disposable accessories, including biopsy valves, valve sets, ERCP instruments, EMR instruments, ESD instruments, grasping forceps, hemoclips, and dissection scissors12. These accessories facilitate various endoscopic procedures, such as tissue cutting, foreign body removal, solution injection, and biopsy collection"
  },
  {
        id: 3,
    question: 'What are the benefits of using Alton\'s Disposable Hemoclip?',
    answer: 'Alton\'s Disposable Hemoclip is designed for clip placement within the gastrointestinal (GI) tract for endoscopic marking and hemostasis3. It can be used for mucosal/sub-mucosal defects, bleeding ulcers, arteries, polyps, and diverticula in the colon3. The clip jaws can be opened and closed multiple times before deployment, aiding in repositioning at the lesion site'
  },
  {
    id: 4,
    question: 'What is the purpose of the Disposable Endoscope Valves Set from Alton?',
    answer: 'The Disposable Endoscope Valves Set includes an Air/Water Valve, a Suction Valve, a Biopsy Valve, and an Auxiliary Water Connector2. These valves control the flow of fluids and gases, assist in cleansing the lens, maintain insufflation, and prevent backflow during endoscopic procedures'
  },
  {
    id: 5,
    question: 'What is Rose Medical\'s role in supplying Alton\'s products?',
    answer: 'RoseMed is a trusted supplier of Alton\'s disposable endoscopic accessories, ensuring that these sterile, single-use instruments are readily available to medical professionals'
  }
]

export async function getFaqItems(): Promise<FaqItem[]> {
  
  return faqItems
} 