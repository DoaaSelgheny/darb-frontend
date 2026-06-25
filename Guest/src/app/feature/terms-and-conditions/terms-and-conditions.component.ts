import { CoreModule, LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [RouterModule, UiComponentsModule, CoreModule],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss',
})
export class TermsAndConditionsComponent {
 
  constructor(private localizationService: LocalizationService,
    private route:ActivatedRoute
  ) {
    this.route.queryParams.subscribe({
      next:next=>{
        this.isApp = next['isApp']
      }
    })
    if( this.isApp == 'true'){
      this.selectItem(this.settings[2])
    }
  }
  settings = [
    {
      name:
        this.localizationService.currentLang == 'en' ? 'Terms and Conditions' : 'الاحكام والشروط',
      select: true,
      content:
        this.localizationService.currentLang == 'en'
          ? `<p class="pb-4"><strong>Guest Requirements:</strong></p>
     
      <p class="pb-2">For full use of Hyyak’s services, guests must complete the required information accurately. This enables service providers to recognize their guests, ensuring safe and guaranteed services for both parties. Required information includes:</p>
      <ul class="pb-2">
      <li >1-Correct name</li>
   <li>2-Valid email address </li>
   <li>3-Verified phone number </li>
   <li>4-Agreement to terms and conditions </li>
   <li>5-Payment information </li>
  
      </ul>
      <p class="pb-6">Sensitive guest information will only be shared with the host after booking. To protect guests, payment will be transferred to the host only once the guest has received the complete service.</p>
      <p class="pb-4"><strong>Host Requirements:</strong></p>
      <p class="pb-2">To use the platform, hosts must complete required information accurately, including:</p>
      
      <ul class="pb-2">
     <li>1-Full name</li>
      <li>2-Valid email address</li>
       <li>3-Verified phone number</li>
        <li>4-Valid ID for individuals / Active commercial registration for companies</li>
         <li>5-Any necessary permits or freelance permits if offering specialized services</li>
          <li>6-Agreement to terms and conditions</li>
           <li>7-Payment information</li>
           </ul>
             <p class="pb-2">To provide safe, comfortable, and high-quality services, hosts must meet these basic requirements:</p>
      
     <ul class="pb-6">
    <li> <strong>Eligibility:  </strong>Must be over 18, legally capable of entering contracts, and possess valid documents. </li>
     <li> <strong> Response Rate: </strong> Respond to inquiries and booking requests within 24 hours.</li>
     <li> <strong>Booking Acceptance: </strong> Accept bookings when available, ensuring timely updates to booking status. </li>
    <li> <strong>Avoid Cancellations: </strong>  Hosts should avoid cancellations. If necessary, notify guests at least 72 hours in advance.</li>
    <li> <strong> Maintain High Ratings: </strong> Properties or experiences with poor ratings will be given time to improve. Continued poor ratings may lead to removal from the platform</li>
    <li> <strong>Basic Amenities: </strong> Hosts are encouraged to provide essential amenities, maintain quality, and adhere to standards. </li>
    <li> <strong>Safety Compliance: </strong> Hosts must follow certified safety regulations and conduct regular checks. Negligence will not be the platform's liability. </li>
    <li> <strong>Service Quality and Professionalism: </strong>  Hosts must deliver services professionally and can seek guidance from Hyyak to improve sales and bookings</li>
    <li> <strong>Honesty and Reliability: </strong> Hosts should provide accurate, truthful information without exaggeration or misrepresentation. </li>
    <li> <strong>Agreement to Terms and Conditions: </strong> Access to all platform tools requires hosts’ agreement to terms and conditions. </li>
    </ul>
      <p class="pb-4" ><strong>Agreement Terms:</strong></p>
      <p class="pb-6">By accessing and using Hyyak, you agree without modification to all terms and conditions stated here, confirming your legal right to use the platform according to these terms.</p>
      <p class="pb-4" ><strong>Terms Modification: </strong></p>
      <p class="pb-6">Hyyak strives to provide accurate information but is not liable for occasional errors. You acknowledge and agree that Hyyak may modify terms, policies, or customer service rules without prior notice. New terms take effect upon publication and will not apply retroactively.</p>
  
      <p class="pb-4"><strong>Booking Terms:</strong></p>
      <p class="pb-2">As a guest, by using Hyyak, you agree to: </p>
      <ul class="pb-6">
        <li>Use the platform only for legitimate bookings.</li>
        <li>Notify other guests included in your booking of all terms.</li>
        <li>Avoid speculative or placeholder bookings. Hyyak may cancel duplicate or speculative bookings without notice.</li>
        <li>Comply with all guest terms, including cancellation policies, property care, and payment.</li>
      </ul>
 
      <p class="pb-4"><strong>Disclaimer:</strong></p>
      <p class="pb-6">Hyyak is not liable for host service accuracy. Disputes should be resolved with the host directly. Hyyak will assist by providing host information for legal resolution if needed and may suspend the host’s membership. </p>
   <p class="pb-4"><strong> Host Terms and Conditions:</strong></p>

 <p class="pb-6">By using Hyyak, hosts agree without modification to all terms and conditions stated here.
</p>
 <p class="pb-4"><strong>Modifying Terms:
</p>
<p class="pb-6">Hyyak may update terms without notice. Continued use implies acceptance of these changes.
</p>
<p class="pb-4"><strong>Adding Properties or Services:
</p>
<p class="pb-6">As a host, you agree to use the platform only for displaying and providing services to customers, following all applicable terms and conditions.
</p>
<p class="pb-4">For <strong> Experience Providers : </strong> Experiences may be reviewed by Hyyak’s quality team to ensure suitability. Hosts must conduct their experiences personally unless legally delegated to a qualified representative.
    </p>  `
          : `<p class="pb-4"><strong>المتطلبات للضيف :</strong></p>
     
      <p class="pb-2">ليتمكن الضيف من استخدام خدمات منصة حياك Hyyak بشكل كامل يتوجب عليه استكمال المعلومات المطلوبة بشكل صحيح حتى يتمكن مزودي الخدمات من معرفة ضيوفهم وحتى يتم الحصول على الخدمات بشكل آمن ومضمون للطرفين. حيث تتضمن المعلومات الاتي:

</p>
      <ul class="pb-2">
      <li >1-الاسم صحيح</li>
   <li>2-عنوان بريد الكتروني صحيح </li>
   <li>3-رقم هاتف مؤكد </li>
   <li>4-الموافقة على الشروط والأحكام </li>
   <li>5-بيانات الدفع </li>
  
      </ul>
      <p class="pb-6">
لن يتم إظهار المعلومات الحساسة الخاصة بالضيف لمزود الخدمة إلا بعد تقديم طلب الحجز، ولحماية الضيف من عمليات النصب أو الاحتيال لن يتم تحويل المبلغ المالي لحساب مزود الخدمة إلا بعد حصول الضيف على الخدمة كاملة.</p>
      <p class="pb-4"><strong>للمستضيف :</strong></p>
      <p class="pb-2">ليتمكن المضيف من استخدام المنصة يتوجب عليه استكمال المعلومات المطلوبة بشكل صحيح

 تتضمن المعلومات الاتي:</p>
      
      <ul class="pb-2">
     <li>1-الاسم بالكامل</li>
      <li>2-عنوان بريد الكتروني صحيح</li>
       <li>3-رقم هاتف مؤكد</li>
        <li>4-هوية صحيحة للأفراد / سجل تجاري ساري المفعول للشركات والمؤسسات</li>
         <li>5-في حال تقديم خدمات تخصصية تتطلب تصريح يرجى ارفاق تصريح وثيقة عمل حر او أي وثيقة داعمة</li>
          <li>6-الموافقة على الشروط والأحكام</li>
           <li>7-بيانات الدفع</li>
           </ul>
             <p class="pb-2">ولضمان تقديم خدمات مميزة ومريحة وآمنة للضيوف يتوجب على المستضيف إتمام المتطلبات الأساسية والتي تتضمن الاتي:</p>
      
     <ul class="pb-6">
    <li> <strong>الأهلية:  </strong>أن يكون المستضيف أكبر من 18 سنة ويملك الحق الشرعي لإنشاء التزام قانوني ويملك كافة الوثائق الضرورية سارية المفعول </li>
     <li> <strong> سرعة الاستجابة: </strong>  الحفاظ على معدل استجابة عالٍ بالرد على استفسارات الحجز وطلبات الحجز في غضون 24 ساعة</li>
     <li> <strong>قبول طلبات الحجز: </strong> اجعل الضيوف يشعرون بالترحاب بقبول الطلبات كلما كنت متاحًا، وضرورة الاهتمام بالتحديث المستمر بحالة الحجز</li>
    <li> <strong>تجنُب الإلغاءات: </strong>  نتعامل مع الإلغاءات على محمل الجد ونطلب من جميع المستضيفين تجنب إلغاء حجوزات الضيوف حيث تعتمد خطط سفرهم عليها، وفي حال حدوث أسباب تستدعي الإلغاء يتوجب إشعار الضيف بذلك في مدة لا تقل عن 72 ساعة.
</li>
    <li> <strong> الحفاظ على تقييم عام عالٍ: </strong> يرغب الضيوف في التأكد من حصولهم على مستوى ثابت من الجودة، بغض النظر عن مكان الحجز. سوف تعطى المساكنالتجارب التي لا تُقيّم بشكل جيد مهله لمعالجة الوضع، وعند استمرار انخفاض التقييم يتم ايقافها او قد تلغى من المنصة.
</li>
    <li> <strong>توفير الميزات الأساسية: </strong> نشجع المضيفين بشدة على توفير الميّزات الأساسية والاهتمام بالجودة والالتزام بالمعايير، لتزيد فرص إقبال الضيوف على حجز خدماتهم</li>
    <li> <strong>مراعاة شروط الأمن والسلامة: </strong> يلتزم المستضيف بلوائح الامن والسلامة المعتمدة من قبل الجهات المختصة وفحصها والتأكد من جاهزيتها بشكل دوري ولا يلحق المنصة اي مطالبات نتيجة اهمال هذا الشرط.
 </li>
    <li> <strong>مراعاة الجودة والاحترافية في الخدمة المقدمة: </strong>  يلتزم مزود المستضيف بأن يقدم الخدمة بأفضل الأشكال من خلال الاهتمام بكل تفاصيل الخدمة لضمان تحقيق تجربة رائعة ومميزة وفريدة للضيف. ونحن في منصة حياكHyyak نساعدك في حال احتياجك للنصائح والإرشاد لتحقيق ذلك مما يسهم في زيادة مبيعاتك وزيادة معدل حجز وشراء خدماتك عبر المنصة. فلا تتردد في التواصل مع فريقنا في أي وقت من خلال بيانات التواصل الموجودة على موقعنا الالكتروني.
</li>
    <li> <strong>الصدق والموثوقية: </strong>يلتزم المستضيف بتوضيح كافة التفاصيل والمعلومات التي لابد للضيف معرفتها قبل وصوله والمرتبطة بالخدمة بصدق بعيداً عن التزييف أو استخدام معلومات غير صحيحة أو غير متوفرة. والتعهد بأن جميع المعلومات دقيقة وصحيحة.
 </li>
    <li> <strong>الموافقة على الشروط والأحكام والمعايير: </strong>لن يستطيع المستضيف من الوصول لكافة أدوات المنصة إلا بعد الموافقة على الشروط والأحكام والالتزام بالمعايير </li>
    </ul>
      <p class="pb-4" ><strong>شروط الاتفاقية:</strong></p>
      <p class="pb-6">

عبر وصولك واستخدام منصة حياك Hyyak فإنك توافق على قبولك من غير تعديل أو قيود أو شروط على جميع الأحكام والشروط الواردة في هذه الاتفاقية. أنت تقر وتضمن حقك القانوني للدخول في هذه الاتفاقية واستخدام الموقع وفقاً لجميع الشروط والأحكام المتواجدة هنا.

</p>
      <p class="pb-4" ><strong>تعديل الشروط: </strong></p>
      <p class="pb-6">تعمل منصة حياك Hyyak قدر الإمكان على توفير المعلومات على الموقع الالكتروني بأكبر دقة ممكنة. مع ذلك، فإن بعض الأخطاء قد تحدث من وقت لآخر، لذا فإن منصة حياك وأي من شركائنا لا نتحمل أي مسؤولية عن أي خطأ في المعلومات التي يتضمنها موقع المنصة.

يتضمن الموقع معلومات حول الخدمات والمنتجات التي توفرها منصة حياك وأي طرف آخر. إن المعلومات والمواد الأخرى على الموقع مقدمة بأمانة تامة. عبر استخدامك الموقع أو التطبيق فإنك توافق وتقر بأنه قد يقوم الموقع بعمل أي تحديث او تغيير أو تعديل على الشروط والأحكام أو سياسة خدمة العملاء أو أي معلومات مقدمة في أي وقت بدون سابق إنذار.

ان الشروط والأحكام تصبح سارية المفعول بمجرد نشرها على الموقع، ولن يكون لها أي أثر رجعي على أي حجوزات تمت مسبقا من خلاله.

يجب عليك قراءة هذه الشروط والأحكام في كل مرة تقوم بزيارة الموقع لضمان أنك على علم بكل الشروط والأحكام السابقة. وفقاً لذلك، الاستمرار باستخدامك للموقع يعتبر موافقة منك على أي تغيير في الشروط والأحكام وسياسة الاستخدام.
</p>
  
      <p class="pb-4"><strong>شروط الحجز:</strong></p>
      <p class="pb-2">Hyyak للحجز فأنت تعلن وتوافق على استخدام الموقع فقط لتحديد مدى توفر الخدمات والمنتجات المتوفرة في الموقع ولمساعدتك لجعل الحجوزات :</p>
      <ul class="pb-6">
        <li>كضيف بمجرد استخدامك منصة حياك Hyyak للحجز فأنت تعلن وتوافق على استخدام الموقع فقط لتحديد مدى توفر الخدمات والمنتجات المتوفرة في الموقع ولمساعدتك لجعل الحجوزات شرعية.

</li>
        <li>استخدام خدمات الموقع فقط للحجوزات الشرعية وستقوم بإعلام كل الأشخاص الآخرين الذين سوف تقوم بالحجز بالنيابة عنهم عن الأحكام التي استخدمت بالحجز الذي قمت به، بما في ذلك جميع القواعد والقيود المطبقة عليها.

</li>
        <li>عدم إجراء أي حجز وهمي أو تخميني أو تحسباً للطلب. من الممكن لموقع حياك أن يقوم بالإلغاء، وبدون سابق إنذار، كل الحجوزات إلى جهة أو جهات متعددة وفي نفس التاريخ.

</li>
        <li>عندما يتم الحجز عبر منصة حياك Hyyak فإنك توافق وتلتزم كليا بالشروط المفروضة على الضيف من قبل المنصة والمستضيفين والتي تضم قوانين الإلغاء أو عدم الحضور والمحافظة على الممتلكات وكل ما يفرض عليك أثناء تلقي الخدمة. كما تقع على مسؤوليتك الشخصية التقيد بجميع شروطنا وأحكامنا الخاصة والتي تتضمن، على سبيل المثال لا الحصر، الدفع الكامل وفي الوقت المناسب لجميع المبالغ المستحقة مع الامتثال لجميع القواعد المتعلقة حول توفر الأسعار او المنتجات أو الخدمات جميع الرسوم.
</li>
      </ul>
 
      <p class="pb-4"><strong>اخلاء المسؤولية:</strong></p>
      <p class="pb-6">

موقع منصة حياك Hyyak غير مسؤول عن توفر أو مدى دقة خدمة المستضيف، ولكن إن حصل خلاف الوصف الخاص بالخدمة، يحق للعميل تقديم شكوى لإدارة المكان / التجربة. كما يحق لإدارة منصة حياك Hyyak اتخاذ الإجراء المناسب تجاه المستضيف .

موقع منصة حياك Hyyak غير مسؤول عن أي ضرر قد يلحق بالضيف من قبل المستضيف أو أي نزاع بين الطرفين , حيث أن منصة حياك Hyyak مجرد وسيط يربط الطرفين ببعضهما ولا يقدم أي ضمانات أو تعويضات , وفي حال حدوث أي ضرر أو نزاع لا قدر الله تتعهد إدارة المنصة بتزويد المتضرر بالبيانات الخاصة بالمستضيف في حال ثبت ذلك ليتمكن الضيف من استخدامها بشكل قانوني نتيجة ما تعرض له من ضرر , ويحق لها إلغاء عضوية المستضيف .

يستخدم موقع منصة حياك Hyyak كل الوسائل لضمان جاهزية الموقع وإتاحة كل الخدمات المرتبطة به، ولكن لا يمكن ضمان عمله بشكل مستمر أو بدون انقطاع ، حيث إن موقع منصة حياك Hyyak لا يملك أي ضمانات، سواء صريحة أو ضمنية، بخصوص محتوى الموقع، ويملك الحق بالتنازل عن جميع الضمانات وذلك وفقا لأقصى مدى متاح في القانون المعمول به.

إن وصولك واستخدامك للبرمجيات وغيرها من المواد، أو من خلال الموقع، يقع على مسؤوليتك الشخصية.

إن موقع منصة حياك Hyyak لا يقدم أية ضمانات حول الدقة أو الخلو من الفيروسات لمثل هذه البرامج.

مع مراعاة القانون المعمول به، تحت أي ظرف من الظروف ان موقع منصة حياك Hyyak والجهات المرخصة لها والموردين ومقدمي الخدمات لا يتحملون أي مسؤولية مباشرة أو غير مباشرة أو عرضية أو خاصة أو تأديبية أو تعويضات تبعية أو رادعة من أي نوع (بما في ذلك على سبيل المثال لا الحصر: خسارة الأرباح أو المدخرات المفقودة أو الإيرادات، أو فقدان أو تلف البيانات أو المعلومات) التي تنشأ مع أي وسيلة اتصال باستخدام أو عدم القدرة على استخدام موقع منصة حياك Hyyak سواء على أساس الإخلال بالعقد أو الضرر أو الإهمال أو المسؤولية عن المنتجات أو غير ذلك، حتى لو تم اعلامك عن امكانية حدوث أي أضرار. هذا يتضمن أي معلومات، منتجات أو خدمات يتم الحصول عليها أو عبر أي اتصال على الموقع أو التطبيق.
</p>
   <p class="pb-4"><strong>شروط واحكام المستضيف:</strong></p>

 <p class="pb-6">شروط الاتفاقية

كمضيف عبر وصولك واستخدام منصة حياك Hyyak فإنك توافق على قبولك، من غير تعديل أو قيود أو شروط على جميع الأحكام والشروط الواردة في هذه الاتفاقية. وتقر وتضمن حقك القانوني للدخول في هذه الاتفاقية واستخدام الموقع وفقاً لجميع الشروط والأحكام المتواجدة هنا.


</p>
 <p class="pb-4"><strong>تعديل الشروط:
</p>
<p class="pb-6">تعمل منصة حياك Hyyak قدر الإمكان على توفير المعلومات على الموقع الالكتروني بأكبر دقة ممكنة. مع ذلك، فإن بعض الأخطاء قد تحدث من وقت لآخر، لذا فإن منصة حياك Hyyak أو أي من شركائنا لا نتحمل أي مسؤولية عن أي خطأ في المعلومات التي يتضمنها الموقع الالكتروني.

يتضمن الموقع معلومات حول الخدمات والمنتجات التي توفرها منصة حياك Hyyak أوأي طرف آخر. إن المعلومات والمواد الأخرى على الموقع مقدمة بأمانة تامة. وعبر استخدامك الموقع او التطبيقات الخاصة بـ منصة حياك Hyyak فإنك توافق وتقر بأنه قد يقوم الموقع بعمل أي تحديث، أو تغيير، أو تعديل للشروط والأحكام، أوسياسة خدمة العملاء، أو أي معلومات مقدمة، في أي وقت بدون سابق إنذار.

ان الشروط والأحكام تصبح سارية المفعول بمجرد نشرها على الموقع، ولن يكون لها أي أثر رجعي على أي حجوزات تمت مسبقا من خلاله.

يجب عليك قراءة هذه الشروط والأحكام في كل مرة تقوم بزيارة الموقع لضمان أنك على علم بكل الشروط والأحكام السابقة. وفقاً لذلك، الاستمرار باستخدامك للموقع يعتبر موافقة منك على أي تغيير في الشروط والأحكام وسياسة الاستخدام.


</p>
<p class="pb-4"><strong>شروط اضافة اماكن الاقامة او الخدمات:
</p>
<p class="pb-6">بمجرد استخدامك الموقع كمضيف فأنت تعلن وتوافق على استخدامه فقط لعرض وتوفير الخدمات والمنتجات للعملاء وتلتزم بالشروط والأحكام والمعايير التي يفرضها موقع حياك.

لمراجعة المعايير:

يتحمل المضيف كافة المسؤولية عن التجربة المقدمة من ناحية السلامة والأمان.

يتعهد المضيف بأن لديه جميع التصاريح المطلوبة نظامياً وقانونياً (إذا كانت أحد المتطلبات)

يتعهد المضيف بوضع وصف شامل للتجربة يتضمن هذا الوصف:


الموقع

مواعيد البدء والانتهاء المدة

الشروط والمتطلبات اللازمة على سبيل المثال لا الحصر (النوع، الفئة، العمر الأدنى، رسوم الإلغاء بعد تأكيد الحجز في حال وجود ذلك، الأدوات المتوفرة والغير متوفرة، الأدوات التي يجب إحضارها، العدد المتاح، معلومات الآمن والسلامة وغيرها)


يتعهد مزود الخدمة بأن جميع المعلومات دقيقة وصحيحة

يتعهد المضيف بأن يكون السعر الموجود في منصة حياك Hyyak أقل أو مساوي تماماً لسعر التجربة الخدمة المقدم في أي منصة أخرى شاملاً ذلك الحجز المباشر من المستضيف. وفي حال ثبوت مخالفة ذلك، يحق لإدارة منصة حياك Hyyak إيقاف العضوية ومنع الانضمام مستقبلاً، وتسقط مستحقات مقدم التجربة (إن وجدت)



يتعهد المضيف بتجهيز كل متطلبات الخدمة قبل وصول الضيف بوقت كافِ، وتواجده قبل وصول الضيف في حال يتطلب الأمر ذلك

يحق لمنصة حياك Hyyak حذف الخدمة، أو منع المضيف إذا تحقق أيا من الاتي:

تتضمن أو تحتوي على تجاوزات قانونية أو غير ملائمة أو تتضمن ما يمس بالدين والقيم وسياسة البلد بأي شكل من الأشكال

عدم ثبوت صحة المعلومات المدرجة من قبل / مزود الخدمة

التلاعب في الأسعار وعدم وضع السعر المتفق عليه

إذا تكرر عدم الحضور في الخدمات التي تتطلب حضور المستضيف بشكل شخصي أو من ينوب عنه بشكل قانوني أو شرعي

إذا تكرر رفض طلبات الحجز على الخدمات المقدمة

إذا تكرر التأخر في إشعار الضيف بعدم توفر الخدمة أو عدم القدرة على القيام بها لأسباب وظروف عرضية أو مفاجأة

إذا أستمر التقييم في وضع ثابت او منخفض ولم يتحسن للأفضل

إذا تم تكرار الحصول على تقييم سلبي من قبل الضيوف

إذا تم تقديم شكوى ضده من قبل الضيوف وثبتت صحة الشكوى

إذا تكرر تأخر وصوله بعد الضيوف في حال يتطلب الأمر ذلك


</p>
<p class="pb-4">

يتعهد / قدم الخدمة بالتحديث المستمر لحالة توافر الخدمات وفي حال عدم توفرها يتم توضيح ذلك بشكل مباشر وواضح

بما يتعلق بمقدمي التجارب، قد تتم اختبار التجربة من قبل فريق المعايير والجودة وذلك لضمان صلاحية التجربة والأداء.

يجب على صاحب المضيف المسجل في منصة حياك Hyyak الذي تمت الموافقة على عضويته تقديم التجربة بنفسه ولا يحق له توكيل أحد غيره للقيام بها إلا بشرط أن يكون التوكيل معترف به من الجهات المسؤولة وأن يكون من ينوب عنه يمتلك كافة المتطلبات ويحقق المعايير والشروط والاحكام الخاصة بتقديم الخدمات عبر منصة حياك Hyyak.


    </p> `,
    },
    {
      name:   this.localizationService.currentLang == 'en'? 'Cancellation or change of reservation':'سياسات الالغاء او تغير الحجز',
      select: false,
      content: this.localizationService.currentLang == 'en'? `<p class="pb-4"><strong>Booking Terms </strong></p>
      <p class="pb-6">
When booking through the Hyyak platform, you fully agree to all booking conditions imposed by the accommodation provider. These include the cancellation and no-show policies, as well as any other terms that may apply during your stay or booking, including services available and/or products offered by the accommodation. (Additional terms and conditions may apply from the specific accommodation provider.)
</p>
      <p class="pb-4"><strong>Late Arrival or No-Show</strong></p>
      <p class="pb-6">You should contact Hyyak if you wish to cancel your booking (if it is eligible for cancellation) before the scheduled booking date. However, if you expect to arrive late for check-in or if check-in is not possible on your booking day, you must contact the host directly to inform them. Failure to check in at the accommodation on the booking day without notification may result in cancellation of the remaining booking period, and you may not be eligible for a refund, in line with the accommodation’s terms and conditions.</p>
      <p class="pb-4"><strong>Changing or Cancelling a Booking</strong></p>
      <p>Requests to cancel accommodations must be made at least 48 hours in advance. It is noted that cancellation policies may vary between accommodations, while experiences require a minimum cancellation notice of 4 days.&nbsp;</p>
      <p>Some bookings may be non-refundable or non-changeable, and some accommodations or experiences may apply certain cancellation fees, while others may allow a full refund. Please note that some bookings at specific rates or special offers are ineligible for changes or cancellations. Some accommodations may also charge additional fees for early or late departures.&nbsp; </p>
      <p>The accommodation's cancellation or change policy is available on the accommodation's webpage or under the "Booking Terms" or "Cancellation Policy" sections, as well as in the electronic booking confirmation and booking receipt. We recommend reviewing the accommodation’s cancellation and no-show policies before completing your booking.&nbsp;</p>
      <p>Regardless of the accommodation/experience’s cancellation or change policy, HYYAK reserves the right to apply specific fees for changes or cancellations, as indicated on the platform. Please check the specific terms and conditions of the accommodation/experience before booking.&nbsp;</p>
      <p>If you wish to review, modify, or cancel your booking, please refer to the electronic booking confirmation and follow the instructions provided, or contact the HYYAK customer service team.
&nbsp;</p>
 <p class="pb-6">If a client repeatedly misses bookings or cancels them frequently, HYYAK reserves the right to restrict or terminate their membership in the future.
</p>
   
      <p class="pb-4"> <strong>Refund Policy:

 </strong><strong>:</strong></p>
      <p><br />1- If the cancellation is initiated by the host, the guest is entitled to a full refund.
&nbsp;
2-If the cancellation is initiated by the guest before the agreed time (48 hours prior to the booking time) as stated in the service description, the client is entitled to a full refund. If the cancellation occurs after the agreed time, the client forfeits the right to a refund.</p>
      <p class="pt-4">Note that different hosts may have varying policies, and guests must be aware of these before requesting a refund.</p>
      <p>The client is entitled to a refund if the service/experience does not match the description, provided sufficient evidence is submitted and approved by HYYAK management.</p>`
    : `<p class="pb-4"><strong>شروط الحجز</strong></p>
      <p class="pb-6">

عندما يتم الحجز عن طريق منصة حياك  Hyyak، فإنك تلتزم وتوافق كلياً على جميع شروط الحجز المفروضة من مكان الإقامة، والتي تضم قوانين الإلغاء وعدم الحضور، وأي شروط أخرى تفرض عليك أثناء الإقامة أو الحجز، بما في ذلك الخدمات المتاحة و/أو المنتجات التي يوفرها مكان الإقامة (من الممكن تحصيل الشروط والأحكام الإضافية الخاصة من مكان الإقامة المحددالمضيف)

</p>
      <p class="pb-4"><strong>الوصول متأخر أو عدم الحضور</strong></p>
      <p class="pb-6">ينبغي عليك التواصل مع منصة حياك &nbsp;Hyyak في حال رغبت بإلغاء حجز ك (القابل للالغاء) قبل حلول موعد الحجز، ولكن إذا احتمل تأخر وصولك عن موعد تسجيل الدخول أو في عدم إمكانية التسجيل في يوم حجزك فعليك التواصل مباشرة مع المضيف وإخباره بذلك. وإذا اخفقت في تسجيل الدخول لمكان الإقامة في يوم الحجز دون إخبارهم بذلك، فقد يتم إلغاء الفترة المتبقية من حجزك وقد لا تكون مخولاً لاسترداد أموالك، وذلك وفقاً للشروط والاحكام الخاصة بمكان الإقامة.</p>
      <p class="pb-4"><strong>التغيير أو إلغاء الحجز</strong></p>
      <p>يتم طلب الإلغاء للأماكن في مدة لا تقل عن ٤٨ ساعة. إضافة الى التنويه باختلاف سياسة إلغاء الحجز بين أماكن الإقامة.&nbsp; بينما التجارب تتطلب مدة كافية للإلغاء لا تقل عن ٤أيام.</p>
      <p>فبعض الحجوزات غير قابلة للتغيير أو الإلغاء، وقد تفرض بعض أماكن الإقامة\التجارب رسوماً معينة على إلغاء الحجز، بينما يتيح بعضها الآخر استرداد مبلغ الحجز بالكامل. يرجى الملاحظة بأن بعض الحجوزات بأسعار معينة أو عروض خاصة غير مؤهلة للتغيير أو الإلغاء. كما قد تقوم بعض أماكن الإقامة بتطبيق رسوم إضافية على المغادرة المبكرة أو المتأخرة.</p>
      <p>تتوفر سياسة تغيير الحجز أو الإلغاء الخاصة بمكان الإقامة على صفحة معلومات الموقع الالكتروني لمكان الإقامة أو تحت بند &ldquo;شروط الحجز&rdquo;، &ldquo;سياسة الإلغاء&rdquo; أو ما شابه ذلك، وفي رسالة تأكيد الحجز الإلكترونية ووصل الحجز. ننصحك بالتأكد من وقراءة سياسة الإلغاء وسياسة عدم الحضور الخاصة بمكان الإقامة قبل إتمام عملية الحجز.</p>
      <p>بغض النظر عن سياسة تغيير أو إلغاء الحجز لمكان الإقامة / التجربة ، يحتفظ موقع&nbsp;<a href="https://hyyak.com/">HYYAK</a>&nbsp;بالحق في فرض رسوم معينة على تغيير أو إلغاء الحجز، وذلك كما هو مبين في الموقع. يرجى التأكد من تفاصيل الشروط والأحكام الخاصة بمكان الإقامة /التجربة قبل القيام بالحجز.</p>
      <p>إذا رغبت باستعراض، تعديل أو إلغاء حجزك، يرجى الرجوع إلى رسالة تأكيد الحجز الإلكترونية وإتباع التعليمات الواردة بها أو التواصل مع فريق خدمة عملاء&nbsp;<a href="https://hyyak.com/">HYYAK</a></p>
      <p class="pb-6">في حال تغيب العميل أكثر من مره وتكرر إلغاءه للحجوزات&nbsp; يحق لإدارة منصة&nbsp;<a href="https://hyyak.com/">HYYAK</a>&nbsp;تقييد أو الغاء عضويته مستقبلاً</p>
      
      <p class="pb-4"> <strong>سياسة الاسترجاع</strong><strong>:</strong></p>
      <p><br /> ١-في حال كان الإلغاء من المضيف فإنه يحق للضيف المطالبة باسترجاع كامل المبلغ.<br /> ٢- في حال كان الإلغاء من طرف الضيف قبل الوقت المتفق عليه (٤٨ ساعة من وقت الحجز) والموجود في وصف الخدمة: فإنه يحق للعميل استرجاع النقود كاملة، و في حال كان الإلغاء بعد الوقت المتفق عليه فإن العميل يفقد الحق بالمطالبة بالنقود.</p>
      <p class="pt-4">مع التنويه على وجود سياسات مختلفة لدى كل مضيف ويتوجب على الضيف وضرورة اطلاع الضيف عليها قبل المطالبة بالاسترجاع.</p>
      <p>يحق للعميل المطالبة باسترجاع النقود في حال لم تكن الخدمة / التجربة مطابقة للوصف الخاص بها وذلك بعد تقديم الدليل الكافي واعتماد إدارة HYYAK ذلك.</p>`,
    },
    {
      name: 'سياسة الخصوصية',
      select: false,
      content: `
      <p>سیاسة الخصوصیة</p>
<p>تعتبر سياسة وشروط الخصوصية الموضحة أدناه جزءاً من شروط استخدام منصة حياك Hyyak</p>
<p>لا یقوم الموقع بجمع معلومات شخصية عنك عندما تقوم بزيارته إلا إذا اخترت تحديدا وبمعرفتك تقديم ھذه المعلومات. وفي حال اخترت تقديم معلومات، فإننا لا نستخدمها إلا لإنجاز طلبك وتحقيق حصولك على تجربة متكاملة ومثالية.</p>
<ol>
<li><strong>المعلومات الشخصية التي نجمعها</strong><strong>.</strong></li>
</ol>
<p><strong>1.1 </strong><strong>المعلومات اللازمة لاستخدام منصة حياك </strong><strong>Hyyak&nbsp;</strong></p>
<p>نجمع معلومات شخصية عنك عند استخدامك منصة حياك Hyyak ، بدونها قد لا نتمكن من تقديم جميع الخدمات المطلوبة. وتشمل هذه المعلومات ما يلي:</p>
<p><strong>1.1.1 </strong><strong>معلومات الاتصال والحساب والملف الشخصي</strong><strong>.</strong>&nbsp;مثل اسمك الأول واسم عائلتك ورقم هاتفك وعنوانك البريدي وعنوان بريدك الإلكتروني وتاريخ ميلادك وصورة ملفك الشخصي، والتي يعتمد بعضها على الميزات التي تستخدمها.</p>
<p><strong>1.1.2 </strong><strong>معلومات الهوية</strong><strong>.&nbsp;</strong>عند الاقتضاء، يجوز أن نطلب منك صورة من بطاقة تعريفك الحكومية (وفقًا للقوانين المعمول بها) أو معلومات أخرى للتحقق، و/أو صورة سيلفي عندما نتحقق من بطاقة تعريفك. إذا تم تزويدنا بنسخة من بطاقة تعريفك، فسنحصل على معلومات منها.</p>
<p><strong>1.1.3 </strong><strong>معلومات الدفع</strong><strong>.&nbsp;</strong>مثل معلومات حساب الدفع أو الحساب المصرفي. إذا لم تكن من مستخدمي منصة حياك Hyyak ، يجوز أن نتلقى معلومات الدفع المتعلقة بك في حالات معينة، مثلما يحدث عندما يقدم أحد مستخدمي منصة حياك Hyyak بطاقة الدفع الخاصة بك لإكمال الحجز.</p>
<p><strong>1.2 </strong><strong>المعلومات التي تختار تقديمها لنا</strong><strong>.&nbsp;</strong>يمكنك اختيار تزويدنا بمعلومات شخصية إضافية، بما في ذلك:</p>
<p><strong>1.2.1 </strong><strong>معلومات الملف الشخصي الإضافية</strong><strong>.</strong>&nbsp;مثل الجنس واللغة (اللغات) المفضلة والمدينة والوصف الشخصي.</p>
<p><strong>1.2.2 </strong><strong>بيانات البيومترية</strong><strong>.</strong>&nbsp;مثل بيانات التعرّف على الوجه المستمدة من الصور ووثائق الهوية التي تقدمها لإجراء عملية التحقق، حيثما يتم تقديمها، وبموافقتك عند الاقتضاء بموجب القانون المعمول به.</p>
<p><strong>1.2.4 </strong><strong>معلومات أخرى</strong><strong>.&nbsp;</strong>على سبيل المثال، عند ملء استمارة، أو إضافة معلومات إلى حسابك، أو الرد على الاستبيانات، أو النشر في منتديات المجتمع، أو المشاركة في العروض الترويجية، أو التواصل مع فريق الدعم في والأعضاء الآخرين، أو استيراد جهات الاتصال من دفتر العناوين أو إدخالها يدويًا، أو تقديم عنوانك و/أو موقعك الجغرافي، أو مشاركة تجربة سفرك معنا.</p>
<p><strong>1.3 </strong><strong>المعلومات التي يتم جمعها تلقائيًا باستخدام منصة حياك</strong> <strong>Hyyak &nbsp;</strong><strong>وخدمات الدفع التي نقدمها</strong><strong>.</strong>&nbsp;عند استخدام منصة حياك &nbsp;Hyyak وخدمات الدفع، نجمع تلقائيًا معلومات معينة. وقد تشمل هذه المعلومات ما يلي:</p>
<p><strong>1.3.1 </strong><strong>معلومات الموقع الجغرافي</strong><strong>.</strong>&nbsp;مثل الموقع الدقيق أو التقريبي الذي يتم تحديده من عنوان IP، أو نظام تحديد المواقع العالمي (GPS) على الجوال أو جهاز آخر، أو أي معلومات أخرى تشاركها معنا، حسب إعدادات جهازك. يجوز أن نجمع هذه المعلومات أيضًا عندما لا تستخدم التطبيق إذا قمت بتمكين ذلك من خلال الإعدادات أو أذونات الجهاز.</p>
<p><strong>1.3.2 </strong><strong>معلومات الاستخدام</strong><strong>.</strong>&nbsp;مثل عمليات البحث عن الإعلانات، والحجوزات التي أجريتها، والخدمات الإضافية التي أضفتها، وتواريخ وأوقات الوصول، والصفحات التي شاهدتها أو شاركت فيها قبل أو بعد استخدام منصة حياك Hyyak ، وغيرها من الإجراءات على منصة حياك &nbsp;Hyyak ، بما في ذلك الصفحات أو المحتوى الذي تشاهده والروابط التي تنقر عليها للانتقال إلى التطبيقات الخارجية. يجوز أن نجمع هذه المعلومات، حتى لو لم تقم بإنشاء حساب على Hyyak أو تسجيل الدخول إليه.</p>
<p><strong>1.3.3 </strong><strong>معلومات الجهاز</strong><strong>.&nbsp;</strong>مثل عنوان IP، ومعلومات مكونات الأجهزة والبرامج، ومعلومات الجهاز، ومعلومات أحداث الجهاز، والمعرفات الفريدة، وبيانات الأعطال، وإيصالات القراءة. يجوز لنا أن نجمع هذه المعلومات، حتى لو لم تنشئ حسابًا على Hyyak أو تسجِّل الدخول إليه.</p>
<p><strong>1.3.4 </strong><strong>ملفات تعريف الارتباط والتقنيات المماثلة </strong></p>
<p><strong>1.3.5 </strong><strong>معلومات معاملات الدفع</strong><strong>.&nbsp;</strong>مثل أداة الدفع المستخدمة، والتاريخ والوقت، ومبلغ الدفع، وتاريخ انتهاء صلاحية أداة الدفع، والرمز البريدي للفوترة، وعنوان البريد الإلكتروني المرتبط بحساب الدفعl، ومعلومات IBAN، وعنوانك، وتفاصيل المعاملات الأخرى ذات الصلة.</p>
<p><strong>1.4 </strong><strong>المعلومات التي نجمعها من الجهات الخارجية</strong><strong>.&nbsp;</strong>يجوز أن نجمع معلومات شخصية من مصادر أخرى، مثل:</p>
<p><strong>1.4.1 </strong><strong>التطبيقات الخارجية</strong><strong>.</strong>&nbsp;إذا اخترت الربط بمنصة Hyyak أو الاتصال بها أو تسجيل الدخول إليها باستخدام خدمة خارجية، مثل Google أو فيسبوك أو أي جهة اخرى، فإنك بذلك تُوجّه الخدمة لإرسال معلومات إلينا مثل بيانات التسجيل وقائمة الأصدقاء ومعلومات الملف الشخصي على النحو الذي تتحكم به تلك الخدمة في هذه المعلومات أو على النحو الذي صرَّحْتَ به عبر إعدادات الخصوصية في تلك الخدمة. وإذا اخترت ربط قفل ذكي بحسابك على Hyyak، يجوز لنا أن نجمع معلومات حول الجهاز الذكي، مثل معلومات السجل أو الأحداث ومعلومات الجهاز.</p>
<p><strong>1.4.2 </strong><strong>الشكاوى</strong><strong>.</strong>&nbsp;إذا قدَّم مضيف أو ضيف أو أي جهة خارجية شكوى بشأنك، يجوز أن نتلقى معلومات تتعلق بالشكوى المحددة المُقدَّمة بغرض فهم الشكوى، ومعالجتها حيثما كان ذلك مناسبًا.</p>
<p><strong>1.4.3 </strong><strong>المؤسسات المالية</strong><strong>.&nbsp;</strong>إذا اخترت الدفع بأموال من حسابك المصرفي، يجوز أن نتلقى معلومات معينة من المؤسسة المالية التي تتعامل معها، مثل تفاصيل الحساب المصرفي ورصيد الحساب.</p>
<p><strong>1.4.4 </strong><strong>خطط الدفع المرنة ومقدمو خدمات التمويل</strong><strong>.</strong>&nbsp;إذا اخترت إجراء حجز ودفع مبلغ الحجز بالتقسيط، يجوز أن نتلقى معلومات معينة من مقدم الخدمة الخارجي، مثل جدول الأقساط والمدفوعات الفعلية بناءً على خطط الدفع المُصرَّح بها.</p>
<p><strong>1.4.5 </strong><strong>مصادر أخرى</strong><strong>.&nbsp;</strong>إلى الحد الذي يسمح به القانون المعمول به، يجوز أن نتلقى معلومات إضافية عنك، مثل&nbsp;<u>جهات الاتصال المرجعية</u>&nbsp;والبيانات الديموغرافية والمعلومات التي تساعد في الكشف عن مشكلات الاحتيال والسلامة، من (1) مقدمي الخدمات الخارجيين و/أو الجهات الخارجية الأخرى و/أو الشركاء، أو (2) الأعضاء وأي أفراد وكيانات وسلطات أخرى، وأن ندمجها مع المعلومات التي جمعناها عنك. على سبيل المثال، يجوز أن نتلقى نتائج التحقق من الخلفية أو تحذيرات الاحتيال من مقدمي خدمات التحقق من الهوية لاستخدامها في جهودنا الخاصة بمنع الاحتيال والتحقيقات الأمنية وتقييم المخاطر. ويجوز أن نتلقى معلومات عنك وعن أنشطتك على منصة Hyyak وخارجها من مستخدمي Hyyak أو أفراد الجمهور، أو السلطات الحكومية ،أو العامة أو الضريبية، أو معلومات عن تجارب سفرك وتعاملاتك من شركائنا. كما يجوز أن نتلقى معلومات صحية بما في ذلك، على سبيل المثال لا الحصر، المعلومات الصحية المتعلقة بالأمراض المعدية.</p>
<ol start="2">
<li><strong>كيفية استخدامنا للمعلومات التي نجمعها</strong><strong>.&nbsp;</strong>نستخدم المعلومات الشخصية على النحو الموضح في سياسة الخصوصية هذه.</li>
</ol>
<p><strong>2.1 </strong><strong>توفير منصة</strong><strong> Hyyak </strong><strong>وتحسينها وتطويرها</strong><strong>.&nbsp;</strong>يجوز أن نعالج هذه المعلومات للأغراض التالية:</p>
<ul>
<li>السماح لك بالوصول إلى منصة Hyyak وإرسال الدفعات واستلامها.</li>
<li>تمكينك من التواصل مع الآخرين.</li>
<li>معالجة طلبك.</li>
<li>إجراء التحليلات وتصحيح الأخطاء وإجراء البحوث.</li>
<li>تطوير منتجاتنا وخدماتنا وتحسينها.</li>
<li>توفير تدريبات على خدمة العملاء.</li>
<li>إرسال الرسائل والتحديثات وتنبيهات الأمان وإشعارات الحساب لك.</li>
<li>معالجة، أو إدارة، أو تقييم مطالبات التأمين ،أو المطالبات المماثلة.</li>
<li>تحديد بلد إقامتك بناءً على المراجعة الآلية لمعلومات حسابك وتفاعلاتك مع منصة Hyyak</li>
<li>تخصيص تجربة سفرك بناءً على تفاعلاتك مع منصة Hyyak ، وسجل البحث والحجز، ومعلومات ملفك الشخصي وتفضيلاتك، والمحتويات الأخرى التي ترسلها.</li>
<li>تمكينك من استخدام منتجاتنا وخدمات الإقامة التي نقدمها.</li>
</ul>
<p><strong>2.2 </strong><strong>حماية منصة</strong><strong> Hyyak </strong><strong>ومستخدميها</strong><strong>.&nbsp;</strong>يجوز أن نعالج هذه المعلومات للأغراض التالية:</p>
<ul>
<li>اكتشاف مخاطر الاحتيال والأمن، ومنعها، وتقييمها، ومعالجتها.</li>
<li>التحقق من المعلومات التي تقدمها أو مصادقتها، بما في ذلك معلومات الهوية، على النحو الموضح في القسم "المعلومات اللازمة لاستخدام منصة Hyyak</li>
<li>فحص قواعد البيانات ومصادر المعلومات الأخرى، بما في ذلك فحوصات الخلفية الجنائية.</li>
<li>الامتثال لالتزاماتنا القانونية، وحماية صحة وسلامة ضيوفنا ومضيفينا والموظفين وأعضاء المجتمع.</li>
<li>حل النزاعات مع أعضائنا، بما في ذلك مشاركة المعلومات مع المضيف المشارك (المضيفين المشاركين) أو الضيوف الإضافيين حول النزاعات المتعلقة بدورك كمضيف مشارك (مضيفين مشاركين) أو كضيف إضافي.</li>
<li>تنفيذ اتفاقياتنا مع الأطراف الخارجية.</li>
<li>تحديد الأهلية لأنواع معينة من الحجوزات، مثل الحجز الفوري،وغيرها</li>
<li>الامتثال للقانون والاستجابة للطلبات القانونية ومنع الضرر وحماية حقوقنا</li>
<li>تقييم أو تثمين تفاعلاتك مع منصة Hyyak والمعلومات التي تم الحصول عليها من جهات خارجية.</li>
</ul>
<p>في بعض الحالات، قد تؤدي العمليات الآلية، التي تُحلل حسابك وأنشطتك على منصة Hyyak بالإضافة إلى المعلومات المتعلقة بالأنشطة التي تتم على منصة Hyyak وخارجها والتي يمكن أن تكون مرتبطة بك، إلى تقييد أو تعليق وصولك إلى منصة Hyyak إذا اكتشفت هذه العمليات نشاطًا قد يشكل خطرًا على السلامة أو غيره من المخاطر على منصة Hyyak أو مجتمعنا أو جهات خارجية.</p>
<p><strong>2.3 </strong><strong>توفير خدماتنا الإعلانية والتسويقية وتخصيصها وقياسها وتحسينها</strong><strong>.&nbsp;</strong>يجوز أن نعالج هذه المعلومات للأغراض التالية:</p>
<ul>
<li>إرسال رسائل ترويجية وتسويقية ومعلومات أخرى إليك.</li>
<li>عرض إعلاناتنا على المنصات الإعلانية وتخصيصها وقياسها وتحسينها.</li>
<li>إدارة برامج الإحالة أو المكافآت أو الاستبيانات أو المسابقات أو غيرها من الأنشطة أو الأحداث الترويجية التي ترعاها أو تديرها منصة Hyyak أو شركاؤها الخارجيون.</li>
<li>تحليل الخصائص والتفضيلات لإرسال رسائل ترويجية وتسويقية وإعلانات ومعلومات أخرى نعتقد أنها قد تهمك.</li>
<li>دعوتك إلى الفعاليات والفرص ذات الصلة.</li>
</ul>
<p><strong>2.4 </strong><strong>تحليل مراسلاتك ومشاركتها</strong><strong>.&nbsp;</strong>يجوز أن نقوم بمراجعة مراسلاتك على منصة&nbsp; Hyyak &nbsp;أو فحصها أو تحليلها للأسباب الموضحة في القسم "كيفية استخدامنا للمعلومات التي نجمعها" الوارد بهذه السياسة، بما في ذلك منع الاحتيال والتحقيقات الأمنية وتقييم المخاطر والامتثال التنظيمي وتطوير المنتجات وإجراء الأبحاث والتحليلات وإنفاذ&nbsp;بنود الخدمة&nbsp;وأغراض دعم العملاء. على سبيل المثال، في إطار جهودنا المبذولة لمنع الاحتيال، نعمل على فحص الرسائل وتحليلها لإخفاء معلومات الاتصال والإشارات إلى المواقع الإلكترونية الأخرى، ورهنًا بالقانون المعمول به، نعمل على فحص وتحليل جميع الصور التي يقوم المستخدمون بتحميلها على منصة Hyyak في سلاسل الرسائل والملفات الشخصية وإعلانات المساكن وتجارب السفر بحثًا عن بعض الأنشطة غير القانونية أو غير اللائقة بغرض تحديد انتهاكات المحتوى وإبلاغ السلطات المختصة بها. وفي بعض الحالات، يجوز لنا أيضًا مسح الرسائل أو مراجعتها أو تحليلها لتنقيح عروض المنتجات وتحسينها وتوسيعها. ونستخدم الطرق الآلية حيثما كان ذلك ممكنًا بشكل معقول. ومع ذلك، قد نحتاج في بعض الأحيان إلى مراجعة بعض حالات التواصل يدويًا، كما هو الحال عند التحقيق في عمليات الاحتيال ودعم العملاء، أو لتقييم وظيفة هذه الأدوات الآلية وتحسينها. لن نقوم بمراجعة اتصالاتك أو مسحها أو تحليلها لإرسال رسائل تسويقية من طرف خارجي إليك، ولن نبيع المراجعات أو التحليلات الخاصة بعمليات التواصل هذه. يجوز أيضًا أن نشارك مراسلاتك على النحو الموضح في القسم "مشاركة البيانات والإفصاح عنها".</p>
<p><strong>2.5 </strong><strong>تقديم خدمات الدفع</strong><strong>.</strong>&nbsp;تُستخدم المعلومات الشخصية لتمكين خدمات الدفع، أو تفويض جهات خارجية باستخدامها، لأغراض معينة مثل:</p>
<ul>
<li>الكشف عن ومنع غسل الأموال والاحتيال وإساءة الاستخدام والحوادث الأمنية، بالإضافة إلى إجراء تقييمات للمخاطر،</li>
<li>الامتثال للالتزامات القانونية وأداء التزامات الامتثال، مثل لوائح مكافحة غسل الأموال وإنفاذ العقوبات،</li>
<li>فرض&nbsp;بنود الدفع&nbsp;وسياسات الدفع الأخرى،</li>
<li>توفير وتحسين خدمات الدفع.</li>
</ul>
<p>&nbsp;</p>
<p><strong>3.</strong><strong>مشاركة البيانات والإفصاح عنها</strong></p>
<p><strong>3.1 </strong><strong>مشاركة البيانات بموافقتك أو وفقًا لتوجيهاتك</strong><strong>.</strong>&nbsp;عندما تقدم موافقتك على مشاركة معلوماتك أو تُوجهنا لمشاركتها، فإننا نشارك معلوماتك على النحو الموضح في وقت الموافقة أو الاختيار، مثلما يحدث عند تفويض تطبيق أو موقع إلكتروني تابع لجهة خارجية للوصول إلى حسابك على منصة&nbsp; Hyyak ، أو معالجة مطالبة تأمينية، أو التقدم بطلب للحصول على منتجات مرنة للدفع والتمويل، أو المشاركة في أنشطة ترويجية برعاية شركاء منصة&nbsp; Hyyak أو جهات خارجية.</p>
<p><strong>3.2 </strong><strong>الجهات التي نشارك البيانات معها</strong><strong>.&nbsp;</strong>يجوز أن نشارك معلوماتك مع:</p>
<p><strong>3.2.1 </strong><strong>الأعضاء الآخرون</strong><strong>.&nbsp;</strong>للمساعدة في تسهيل الحجوزات أو التعاملات الأخرى بين الأعضاء</p>
<p><strong>3.2.2 </strong><strong>مقدمو الخدمات الذين يستعين بهم الأعضاء</strong><strong>.</strong>&nbsp;يجوز للمضيفين استخدام خدمات خارجية للمساعدة في إدارة خدماتهم أو تقديمها، مثل خدمات التنظيف أو مقدمي خدمات الأقفال. ويجوز للمضيفين استخدام الميزات على منصة&nbsp; Hyyak لمشاركة المعلومات حول الضيف مع مقدمي الخدمات الخارجيين المعنيين. كما يجوز للأعضاء الآخرين استخدام خدمات أخرى غير منصة Hyyak لمعالجة بياناتك، بما في ذلك البريد الإلكتروني أو برنامج إدارة الحجوزات. لا تخضع هذه الخدمات لسيطرة منصة Hyyak بينما تخضع للقانون المعمول به.</p>
<p><strong>3.2.3 </strong><strong>إدارة البناية</strong><strong>.</strong>&nbsp;تجوز لنا مشاركة المعلومات الشخصية الخاصة بالمضيفين والضيوف مع مالك (مالكي) مكان الإقامة، و/أو جمعية مالكي المنازل، و/أو وكلائهم، مثل مُشغّل المبنى أو شركة إدارة العقارات ("إدارة البناية")، بما في ذلك معلومات الحجز والمعلومات المتعلقة بالامتثال للقوانين المعمول بها، من أجل تسهيل البرامج التي تتعلق بإدارة البنايات. وتجوز مشاركة بيانات حجز الضيف ومعلوماته الشخصية، بما في ذلك معلومات الاتصال بالضيف، مع إدارة البناية التي تتولى شؤون المبنى أو المجمع أو المجتمع الذي يعيش فيه المضيف و/أو يقع فيه المسكن لتسهيل خدمات الاستضافة والامتثال للقوانين المعمول بها وتوفير خدمات الأمن والفوترة والخدمات الأخرى.</p>
<p><strong>3.2.4 </strong><strong>شركاؤنا من منظمي الرحلات\وكالات السفر.</strong><strong>&nbsp;</strong> تجوز لنا مشاركة المعلومات الشخصية الخاصة بالضيوف مع شركاؤنا الذين يساهمون في حصول الضيف على تجربة مميزة وناجحة بما في ذلك معلومات الحجز والمعلومات المتعلقة بالامتثال للقوانين المعمول بها، من أجل تسهيل البرامج التي تتعلق بالأنشطة والتجارب السياحية .</p>
<p><strong>3.2.5 </strong><strong>المستضيفين</strong><strong>.&nbsp;</strong>نشارك المعلومات الشخصية مع مقدمي الخدمات التابعين وغير التابعين (بما في ذلك مقدمي الخدمات التابعين لهم) لمساعدتنا في إدارة أعمالنا ولأغراض الامتثال الخاصة بهم، بما في ذلك مقدمي الخدمات الذين يساعدوننا في: (1) التحقق من هويتك أو مصادقة وثائق هويتك، أو (2) التحقق من المعلومات وفقًا لقواعد البيانات العامة، أو (3) إجراء فحوصات الخلفية الجنائية، ومنع الاحتيال، والتحقيقات الأمنية، وتقييمات المخاطر، أو (4) إجراء تطوير للمنتجات وصيانتها وتصحيح الأخطاء بها، أو (5) السماح بتقديم خدمات من خلال المنصات وأدوات البرامج الخارجية، أو (6) تقديم خدمة العملاء أو الإعلانات أو خدمات الدفع ، أو (7) تقديم خدمات إضافية تختارها، أو (٨) معالجة مطالبات التأمين أو المطالبات المماثلة أو التعامل معها أو تقييمها، أو (9) مراجعة وفحص وتحليل المراسلات على منصة Hyyak لأغراض معينة، مثل وجود أدلة على &nbsp;أي ممارسات ممنوعة او غير مسموح بها، أو (10) تقديم خطط الدفع المرنة وخدمات التمويل التي يوفرها مُقدِّم ائتمان خارجي، ويمكنك الاطلاع على القسم "تحليل مراسلاتك ومشاركتها" للحصول على معلومات إضافية. ويلتزم مقدمو الخدمات المعنيون بحماية معلوماتك الشخصية بموجب التعاقد، ويتمتعون بإمكانية الوصول إلى معلوماتك الشخصية لأداء هذه المهام، ويجوز لهم أيضًا الإفصاح عن معلوماتك عند الاقتضاء بموجب القانون.</p>
<p><strong>3.3 </strong><strong>الأغراض التي نشارك معلوماتك على أساسها</strong><strong>.&nbsp;</strong>يجوز أن نشارك معلوماتك للأغراض التالية:</p>
<p><strong>3.3.1 </strong><strong>إنشاء ملفك الشخصي العام</strong><strong>.</strong>&nbsp;تجوز فهرسة المعلومات التي تشاركها بشكل عام على منصة Hyyak من خلال محركات البحث الخارجية. وفي بعض الحالات، يمكنك إلغاء الاشتراك في هذه المشاركة من خلال إعدادات حسابك. يجوز لنا أن نعرض معلومات معينة علنًا للآخرين، مثل:</p>
<ul>
<li>معلومات ملفك الشخصي وحسابك والمعلومات المستمدة منها.</li>
<li>صفحات إعلانات المساكن التي تتضمن معلومات مثل وصف الموقع التقريبي أو الدقيق لمكان الإقامة أو تجربة السفر، وإتاحة الأيام في التقويم، وصورة الملف الشخصي، ومعلومات الطلب المجمعة، ومعلومات إضافية تختار مشاركتها.</li>
<li>المراجعات والتقييمات والملاحظات العامة الأخرى.</li>
<li>المحتوى الوارد في منتدى مجتمع، أو منتدى مناقشة أو مدونة أو منشور على وسائل التواصل الاجتماعي، والمحتوى الذي توفره للجمهور، بما في ذلك تفاصيل المسكن\التجربة على المواقع والمنصات والتطبيقات الخارجية.</li>
</ul>
<p><strong>3.3.2 </strong><strong>الامتثال للقانون والاستجابة للطلبات القانونية ومنع الضرر وحماية حقوقنا</strong><strong>.</strong></p>
<p><strong>3.3.2 (1) </strong><strong>الإفصاح عن البيانات</strong><strong>.&nbsp;</strong>يجوز لنا الإفصاح عن معلوماتك للمحاكم أو سلطات إنفاذ القانون أو السلطات الحكومية أو العامة أو السلطات الضريبية أو الجهات الخارجية المُصرَّح لها أو الأعضاء الآخرين، إذا كان مطلوبًا منا ذلك أو مسموحًا لنا بذلك بموجب القانون، وإلى الحد المطلوب أو المسموح به بموجب القانون، أو عندما يكون الإفصاح ضروريًا بشكل معقول للأغراض التالية: (1) الامتثال لالتزاماتنا القانونية، أو (2) الامتثال لطلب قانوني صالح، مثل أمر استدعاء أو أمر صادر من المحكمة، أو الاستجابة للدعاوى المرفوعة ضد Hyyak أو (3) الاستجابة لطلب قانوني صالح يتعلق بتحقيق جنائي يتعامل مع نشاط غير قانوني مزعوم أو مشتبه فيه، أو للرد على أو معالجة أي نشاط آخر قد يُعرّضنا أو يُعرّضك أو يُعرّض أيًا من مستخدمينا الآخرين للمساءلة القانونية أو التنظيمية، أو (4) إنفاذ&nbsp;<u>اتفاقياتنا</u>&nbsp;مع الأعضاء وإدارتها، بما في ذلك&nbsp;<u>بنودنا</u>&nbsp;و<u>بنودنا القانونية الإضافية</u>&nbsp;و<u>سياساتنا</u>، أو (5) الاستجابة لطلبات المطالبات القانونية القائمة أو المرتقبة أو الإجراءات القانونية المتعلقة بشركة حياك Hyyak و/أو الجهات الخارجية أو في ما يتصل بها، وفقًا للقانون المنطبق أو (6) حماية الحقوق أو الممتلكات أو السلامة الشخصية الخاصة بشركة حياك Hyyak &nbsp;أو موظفيها أو أعضائها أو أفراد الجمهور.</p>
<p><strong>3.3.2 (1) (</strong><strong>أ) إلى السلطات الضريبية</strong><strong>.&nbsp;</strong>عندما يكون ذلك مطلوبًا قانونًا أو مسموحًا به وفقًا للقانون المعمول به، يجوز لنا الإفصاح عن معلومات المضيفين و/أو الضيوف إلى السلطات الضريبية المعنية أو الهيئات الحكومية الأخرى، حسب المكان الذي تقيم فيه، لغرض تحديد السلطات الضريبية للامتثال السليم للالتزامات الضريبية ذات الصلة.</p>
<p><strong>3.3.2 (1) (</strong><strong>ب) إلى السلطات الحكومية للتسجيلات أو الإشعارات أو التصاريح أو طلبات التراخيص أو أرقام التراخيص</strong><strong>.&nbsp;</strong>في السلطات القضائية التي تقوم فيها منصة حياك Hyyak &nbsp;&nbsp;بتسهيل أو اشتراط طلب تسجيل أو رقم تسجيل أو إشعار أو تصريح أو ترخيص خاص بالمضيف لدى سلطة حكومية، يجوز لنا مشاركة معلومات المضيفين المشاركين مع السلطة المختصة، أثناء عملية تقديم الطلب، وعند نشر إعلان المسكن، وبشكل دوري بعد ذلك.</p>
<p><strong>3.3.2 (2) </strong><strong>الإشعار</strong><strong>.&nbsp;</strong>حيثما كان ذلك مناسبًا و/أو مطلوبًا بموجب القانون، يجوز لنا إرسال إشعار إلى الأعضاء بشأن الطلبات القانونية، ما لم: (1) يُحظر تقديم الإشعار بموجب الإجراءات القانونية نفسها، أو بأمر قضائي وارد إلينا، أو بموجب القانون المعمول به، أو (2) نعتقد أن تقديم الإشعار سيكون عديم الجدوى أو غير فعال أو يتسبب في خطر الإصابة أو الأذى الجسدي لفرد أو مجموعة، أو يخلق أو يزيد من خطر الاحتيال أو الإضرار بشركة حياك Hyyak &nbsp;أو أعضائنا أو تعريض منصة حياك Hyyak &nbsp;&nbsp;لادعاء بإعاقة سير العدالة.</p>
<p><strong>3.3.3 </strong><strong>تنفيذ إجراءات نقل ملكية الأعمال</strong><strong>.</strong>&nbsp;إذا اضطلعت منصة حياك &nbsp;Hyyak أو شاركت في أي اندماج أو استحواذ أو إعادة تنظيم أو بيع أصول أو إفلاس أو حالة إعسار، يجوز لنا حينئذٍ بيع أو نقل أو مشاركة بعض أو جميع أصولنا، بما في ذلك معلوماتك الشخصية في سياق هذه المعاملة أو تهيئةً لهذه المعاملة، مثل العناية الواجبة. وفي هذه الحالة، سنُعلمك قبل نقل معلوماتك الشخصية وستخضع تلك المعلومات لسياسة خصوصية مختلفة.</p>
<ol start="4">
<li><strong>الشركاء الخارجيون وعمليات التكامل</strong><strong>.</strong></li>
</ol>
<p><strong>4.1 </strong><strong>ربط الخدمات الخارجية</strong><strong>.</strong>&nbsp;يمكنك ربط حسابك على منصة حياك &nbsp;Hyyakببعض الخدمات الخارجية، مثل شبكات وسائل التواصل الاجتماعي. عند توجيه مشاركة البيانات بإنشاء هذا الربط:</p>
<ul>
<li>يجوز نشر بعض المعلومات المقدمة إلينا من الحسابات المرتبطة على ملفك الشخصي العام.</li>
<li>يجوز تخزين المعلومات التي تقدمها لنا من ربط حساباتك ومعالجتها ونقلها لأغراض منع الاحتيال وإجراء التحقيقات الأمنية وتقييم المخاطر، و</li>
<li>نشارك المعلومات حول حجزك مع شركاء السفر الخارجيين وبرامج المكافآت.</li>
<li>يخضع نشر وعرض المعلومات التي تقدمها إلى منصة Hyyak من خلال هذا الربط لإعداداتك وتفويضاتك على منصة Hyyak والخدمة الخارجية.</li>
</ul>
<p><strong>4.2 </strong><strong>بنود الخدمات الخارجية</strong><strong>.</strong>&nbsp;يجوز أن ترتبط أجزاء من Hyyak بخدمات خارجية. ولا تمتلك Hyyak هذه الجهات الخارجية أو تتحكم فيها. عندما تتعامل مع هذه الجهات الخارجية وتقرر استخدام الخدمات التي تقدمها، فإنك تقدم معلوماتك لهم. ويخضع استخدامك لهذه الخدمات لسياسات الخصوصية المعمول بها لدى مقدمي الخدمات الذين يعتبرون جزء من تكامل الخدمة المقدمة لك لتحصل علت افضل تجربه اثناء استخدام منصة Hyyak .</p>
<p>&nbsp;</p>`,
    },
  ];
  isApp:string = 'false'
  content =  this.settings[0].content;

  selectItem(item: any) {
    const currentSelected = this.settings.find(item => !!item.select);
    currentSelected!.select = false;
    item.select = true;
    this.content = item.content;
  }
}
