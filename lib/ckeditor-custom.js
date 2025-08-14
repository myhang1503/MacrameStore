// Import NAMED từ package gốc
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { Paragraph }  from '@ckeditor/ckeditor5-paragraph'
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles'
import { Link } from '@ckeditor/ckeditor5-link'
import {
  Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload, ImageInsert
} from '@ckeditor/ckeditor5-image'

// ✨ Thêm mới:
import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent'
import {
  FontFamily, FontSize, FontColor, FontBackgroundColor
} from '@ckeditor/ckeditor5-font'
import { Highlight } from '@ckeditor/ckeditor5-highlight'
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line'
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format'
import { List, ListProperties } from '@ckeditor/ckeditor5-list'
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table'
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed'
import { CodeBlock } from '@ckeditor/ckeditor5-code-block'

class ClassicEditor extends ClassicEditorBase {}
// export default hoặc provide ra NuxtApp như bạn đang dùng
export default ClassicEditor

ClassicEditor.builtinPlugins = [
  Essentials, Paragraph, Bold, Italic, Link,
  Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload, ImageInsert,
  Alignment, Indent, IndentBlock,
  FontFamily, FontSize, FontColor, FontBackgroundColor,
  Highlight, HorizontalLine, RemoveFormat,
  List, ListProperties,
  Table, TableToolbar,
  MediaEmbed,
  CodeBlock
]

// Toolbar + cấu hình
ClassicEditor.defaultConfig = {
  licenseKey: 'GPL',                     // để hết cảnh báo license
  toolbar: [
    'bold','italic','link','removeFormat','|',
    'bulletedList','numberedList','outdent','indent','|',
    'alignment', 'horizontalLine', '|',
    'fontFamily','fontSize','fontColor','fontBackgroundColor','highlight','|',
    'imageUpload','insertImage','mediaEmbed','insertTable','codeBlock','|',
    'undo','redo'
  ],
  alignment: { options: ['left','center','right','justify'] },
  list: { properties: { styles: true, startIndex: true, reversed: true } },
  image: {
    insert: { type: 'block' },  
    toolbar: [
      'imageStyle:alignLeft','imageStyle:alignCenter','imageStyle:alignRight',
      '|','resizeImage','|','toggleImageCaption','imageTextAlternative'
    ],
    // style buttons
    styles: [
      'alignLeft','alignCenter','alignRight'
    ],
    // resize
    resizeUnit: 'px',
    resizeOptions: [
      { name:'resizeImage:original', label:'Original', value:null },
      { name:'resizeImage:25', label:'25%', value:'25' },
      { name:'resizeImage:50', label:'50%', value:'50' },
      { name:'resizeImage:75', label:'75%', value:'75' }
    ]
  },
  table: { contentToolbar: ['tableColumn','tableRow','mergeTableCells'] },
  language: 'en'
}
