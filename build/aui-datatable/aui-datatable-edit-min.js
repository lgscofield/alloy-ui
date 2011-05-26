AUI.add("aui-datatable-edit",function(ao){var aa=ao.Lang,a8=ao.Array,d=aa.isArray,aN=aa.isBoolean,aI=aa.isFunction,G=aa.isObject,aS=aa.isString,aH=aa.String,aF=ao.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),aY=function(A){return(A instanceof ao.BaseCellEditor);},am=ao.WidgetStdMod,y=ao.getClassName,ac="add",aZ="addOption",aG="baseCellEditor",q="boundingBox",P="calendar",ai="cancel",aK="cell",at="celleditor",B="checkboxCellEditor",n="checked",aC="click",z="columnset",u="contentBox",az="data",N="datatable",J="dateCellEditor",T="delete",al="disk",aJ="dropDownCellEditor",K="edit",X="editable",e="editor",D="editEvent",ag="editOptions",F="element",ay="elementName",aL="field",t="hide",aq="hideOnSave",aB="id",m="initEdit",a7="initToolbar",ap="initValidator",Z="input",c="inputFormatter",a6="key",ar="label",an="link",V="mousedown",Y="multiple",k="name",aP="option",aU="options",s="optionsCellEditor",a3="outputFormatter",j="pencil",ah="radioCellEditor",af="records",i="recordset",a4="remove",a1="rendered",ae="return",l="row",aE="save",ad="saveOptions",aQ="selected",aw="selectedAttrName",W="showToolbar",aT="submit",Q="textAreaCellEditor",w="textCellEditor",M="toolbar",x="unescapeValue",U="validator",aX="value",ab="visible",aV="wrapper",ba=",",h=".",R="",g="#",a0="\n",a5=" ",r=/<br\s*\/?>/gi,C=/[\r\n]/g,ak=y(at,K,ar),ax=y(at,K,aP,l),b=y(at,K),f=y(at,K,ac,aP),O=y(at,K,aE,aP),aO=y(at,K,T,aP),a2=y(at,K,t,aP),au=y(at,K,Z,k),aD=y(at,K,Z,aX),o=y(at,K,an),S=y(at,F),aR=y(at,ar),I=y(at,aP),v=y(at,aV),E=y(N,X),aM="<br/>";var aW=function(){};aW.NAME="dataTableCellEditorSupport";aW.ATTRS={editEvent:{setter:"_setEditEvent",validator:aS,value:aC}};ao.mix(aW.prototype,{initializer:function(){var A=this;A.after({render:A._afterRenderEditor});A.on(A.get(D),A._onCellEdit);A.after(A._afterUiSetRecordset,A,"_uiSetRecordset");},getCellEditor:function(bb,bd){var A=this;var bc=bd.get(e);var be=bb.get(az).editor;if(bc===false){return null;}return be||bc;},getRecordColumnValue:function(A,bb){return A.getValue(bb.get(aL));},syncEditableColumnsUI:function(){var A=this;var bc=A.get(z);var bb=A.get(i);ao.each(bc.idHash,function(be){var bd=be.get(e);if(aY(bd)){ao.all("[headers="+be.get(aB)+"]").addClass(E);}});ao.each(bb.get(af),function(bd){var be=bd.get(az).editor;if(aY(be)){ao.all(g+bd.get("id")+">td").each(function(bh,bf){var bg=bc.getColumn(bf);if(bg.get(e)!==false){bh.addClass(E);}});}});},_afterUiSetRecordset:function(bb){var A=this;A.syncEditableColumnsUI();},_afterRenderEditor:function(bb){var A=this;if(!A.events){A.plug(ao.Plugin.DataTableEvents);}},_editCell:function(bf){var A=this;var bh=A.get(z);var bg=A.get(i);var be=bf.column;var bb=bf.record;A.activeColumnIndex=bh.getColumnIndex(be);A.activeRecordIndex=bg.getRecordIndex(bb);var bc=bf.alignNode||bf.cell;var bd=A.getCellEditor(bb,be);if(aY(bd)){if(!bd.get(a1)){bd.on({visibleChange:ao.bind(A._onEditorVisibleChange,A),save:ao.bind(A._onEditorSave,A)});bd.render();}bd.set(aX,A.getRecordColumnValue(bb,be));bd.show().move(bc.getXY());}},_onCellEdit:function(bb){var A=this;A._editCell(bb);},_onEditorVisibleChange:function(bf){var bb=this;var bd=bb.selection;if(bd){var bc=bd.getActiveRecord();var be=bd.getActiveColumn();var A=bb.getCellNode(bc,be);var bg=bb.getRowNode(bc);bd.select(A,bg);}},_onEditorSave:function(bd){var A=this;var bc=bd.currentTarget;var be=A.get(i);bc.set(aX,bd.newVal);var bb=A.selection;if(bb){be.updateRecordDataByKey(bb.getActiveRecord(),bb.getActiveColumn().get(a6),bd.newVal);A.set(i,be);}},_setEditEvent:function(A){return aK+aF(A);}});ao.DataTable.CellEditorSupport=aW;ao.DataTable.Base=ao.Base.create("dataTable",ao.DataTable.Base,[ao.DataTable.CellEditorSupport]);var p=ao.Component.create({NAME:aG,ATTRS:{editable:{value:false,validator:aN},elementName:{value:aX,validator:aS},footerContent:{value:R},hideOnSave:{value:true,validator:aN},inputFormatter:{value:function(A){if(aS(A)){A=A.replace(C,aM);}return A;}},outputFormatter:{value:function(bb){var A=this;if(aS(bb)){if(A.get(x)){bb=aH.unescapeEntities(bb);}bb=bb.replace(r,a0);}return bb;}},showToolbar:{value:true,validator:aN},strings:{value:{edit:"Edit",save:"Save",cancel:"Cancel"}},tabIndex:{value:1},toolbar:{setter:"_setToolbar",validator:G,value:null},unescapeValue:{value:true,validator:aN},validator:{setter:"_setValidator",validator:G,value:null},value:{value:R},visible:{value:false}},EXTENDS:ao.Overlay,UI_ATTRS:[X,W,aX],prototype:{CONTENT_TEMPLATE:"<form></form>",ELEMENT_TEMPLATE:null,elements:null,validator:null,_hDocMouseDownEv:null,initializer:function(bb){var A=this;A._initEvents();},destructor:function(){var bb=this;var A=bb._hDocMouseDownEv;var bd=bb.toolbar;var bc=bb.validator;if(A){A.detach();}if(bd){bd.destroy();}if(bc){bc.destroy();}},bindUI:function(){var A=this;A.get(q).on(a6,ao.bind(A._onEscKey,A),"down:27");},formatValue:function(bb,bc){var A=this;if(aI(bb)){bc=bb.call(A,bc);}return bc;},getValue:function(){var A=this;return A.formatValue(A.get(c),A.getElementsValue());},_initEvents:function(){var A=this;A.publish({cancel:{defaultFn:A._defCancelFn},initEdit:{defaultFn:A._defInitEditFn,fireOnce:true},initValidator:{defaultFn:A._defInitValidatorFn,fireOnce:true},initToolbar:{defaultFn:A._defInitToolbarFn,fireOnce:true},save:{defaultFn:A._defSaveFn}});A.after({render:A._afterRender,visibleChange:ao.debounce(A._debounceVisibleChange,350,A)});A.on({"form-validator:submit":ao.bind(A._onSubmit,A)});},_afterRender:function(){var A=this;A._handleInitValidatorEvent();A._handleInitToolbarEvent();},_defCancelFn:function(bb){var A=this;A.hide();},_defInitValidatorFn:function(bb){var A=this;A.validator=new ao.FormValidator(A.get(U));},_defInitToolbarFn:function(bc){var A=this;var bb=A.get(X);A.toolbar=new ao.Toolbar(A.get(M)).render(A.footerNode);if(bb){A._uiSetEditable(bb);}},_defSaveFn:function(bb){var A=this;if(A.get(aq)){A.hide();}},_debounceVisibleChange:function(bc){var bb=this;var A=bb._hDocMouseDownEv;if(bc.newVal){if(!A){bb._hDocMouseDownEv=ao.getDoc().on(V,ao.bind(bb._onDocMouseDownExt,bb));
}}else{if(A){A.detach();bb._hDocMouseDownEv=null;}}},_handleCancelEvent:function(){var A=this;A.fire(ai);},_handleEditEvent:function(){var A=this;A.fire(K);},_handleInitEditEvent:function(){var A=this;if(A.get(a1)){this.fire(m);}},_handleInitValidatorEvent:function(){var A=this;if(A.get(a1)){this.fire(ap);}},_handleInitToolbarEvent:function(){var A=this;if(A.get(a1)&&A.get(W)){this.fire(a7);}},_handleSaveEvent:function(){var A=this;if(!A.validator.hasErrors()){A.fire(aE,{newVal:A.getValue(),prevVal:A.get(aX)});}},_onDocMouseDownExt:function(bc){var A=this;var bb=A.get(q);A.set(ab,bb.contains(bc.target));},_onEscKey:function(bb){var A=this;A.hide();},_onSubmit:function(bc){var A=this;var bb=bc.validator;A._handleSaveEvent();if(bb){bb.formEvent.halt();}},_setToolbar:function(bc){var bb=this;var A=bb.getStrings();return ao.merge({activeState:false,children:[{label:A[aE],icon:al,type:aT},{handler:ao.bind(bb._handleCancelEvent,bb),label:A[ai]}]},bc);},_setValidator:function(bb){var A=this;return ao.merge({boundingBox:A.get(u),bubbleTargets:A},bb);},_uiSetShowToolbar:function(bc){var A=this;var bb=A.footerNode;if(bc){bb.show();}else{bb.hide();}A._handleInitToolbarEvent();},getElementsValue:function(){var A=this;var bb=A.elements;if(bb){return bb.get(aX);}return R;},renderUI:function(){var A=this;if(A.ELEMENT_TEMPLATE){A.elements=ao.Node.create(A.ELEMENT_TEMPLATE);A._syncElementsName();A.setStdModContent(am.BODY,A.elements);}},_defInitEditFn:function(A){},_syncElementsName:function(){var A=this;A.elements.setAttribute(k,A.get(ay));},_uiSetEditable:function(bc){var A=this;var bb=A.toolbar;if(A.get(a1)&&bb){if(bc){bb.add({handler:ao.bind(A._handleEditEvent,A),icon:j,label:A.getString(K)},1);}else{bb.remove(1);}}},_uiSetValue:function(bc){var A=this;var bb=A.elements;if(bb){bb.val(A.formatValue(A.get(a3),bc));ao.later(30,bb,bb.selectText);}}}});ao.BaseCellEditor=p;var a9=ao.Component.create({NAME:s,ATTRS:{inputFormatter:{value:null},options:{setter:"_setOptions",value:{},validator:G},outputFormatter:{value:null},selectedAttrName:{value:aQ,validator:aS},strings:{value:{add:"Add",cancel:"Cancel",addOption:"Add option",edit:"Edit options",editOptions:"Edit option(s)",name:"Name",remove:"Remove",save:"Save",saveOptions:"Save options",stopEditing:"Stop editing",value:"Value"}}},EXTENDS:ao.BaseCellEditor,UI_ATTRS:[aU],prototype:{EDIT_TEMPLATE:'<div class="'+b+'"></div>',EDIT_OPTION_ROW_TEMPLATE:'<div class="'+ax+'">'+'<input class="'+au+'" size="7" placeholder="{titleName}" title="{titleName}" type="text" value="{valueName}" /> '+'<input class="'+aD+'" size="7" placeholder="{titleValue}" title="{titleValue}" type="text" value="{valueValue}" /> '+'<a class="'+[o,aO].join(a5)+'" href="javascript:void(0);">{remove}</a> '+"</div>",EDIT_ADD_LINK_TEMPLATE:'<a class="'+[o,f].join(a5)+'" href="javascript:void(0);">{addOption}</a> ',EDIT_LABEL_TEMPLATE:'<div class="'+ak+'">{editOptions}</div>',EDIT_SAVE_LINK_TEMPLATE:'<a class="'+[o,O].join(a5)+'" href="javascript:void(0);">{saveOptions}</a> ',editContainer:null,options:null,initializer:function(){var A=this;A.on(K,A._onEditEvent);A.after(a7,A._afterInitToolbar);},addNewOption:function(bc,be){var A=this;var bd=A.editContainer.all(h+ax).last();var bb=ao.Node.create(A._createEditOption(bc||R,be||R));bd.placeAfter(bb);bb.one(Z).focus();},removeOption:function(A){A.remove();},saveOptions:function(){var A=this;var be=A.editContainer;if(be){var bd=be.all(h+au);var bb=be.all(h+aD);var bc={};bd.each(function(bh,bg){var bf=bh.val();var bi=bb.item(bg).val();if(bf&&bi){bc[bi]=bf;}});A.set(aU,bc);A._uiSetValue(A.get(aX));A.toggleEdit();}},toggleEdit:function(){var A=this;A.editContainer.toggle();},_createOptions:function(bc){var bg=this;var A=bg.elements;var be=[];var bb=[];var bd=bg.OPTION_TEMPLATE;var bh=bg.OPTION_WRAPPER;ao.each(bc,function(bl,bk){var bj={id:ao.guid(),label:bl,name:bk,value:bk};if(bd){be.push(ao.substitute(bd,bj));}if(bh){bb.push(ao.substitute(bh,bj));}});var bi=ao.NodeList.create(be.join(R));var bf=ao.NodeList.create(bb.join(R));if(bf.size()){bf.each(function(bk,bj){bk.prepend(bi.item(bj));});A.setContent(bf);}else{A.setContent(bi);}bg.options=bi;},_createEditBuffer:function(){var bb=this;var A=bb.getStrings();var bc=[];bc.push(aa.sub(bb.EDIT_LABEL_TEMPLATE,{editOptions:A[ag]}));ao.each(bb.get(aU),function(bd,be){bc.push(bb._createEditOption(bd,be));});bc.push(aa.sub(bb.EDIT_ADD_LINK_TEMPLATE,{addOption:A[aZ]}));bc.push(aa.sub(bb.EDIT_SAVE_LINK_TEMPLATE,{saveOptions:A[ad]}));return bc.join(R);},_createEditOption:function(bc,bd){var bb=this;var A=bb.getStrings();return aa.sub(bb.EDIT_OPTION_ROW_TEMPLATE,{remove:A[a4],titleName:A[k],titleValue:A[aX],valueName:bc,valueValue:bd});},_defInitEditFn:function(bb){var A=this;var bc=ao.Node.create(A.EDIT_TEMPLATE);bc.delegate("click",ao.bind(A._onEditLinkClickEvent,A),h+o);bc.delegate("keydown",ao.bind(A._onEditKeyEvent,A),Z);A.editContainer=bc;A.setStdModContent(am.BODY,bc.hide(),am.AFTER);A._syncEditOptionsUI();},_getSelectedOptions:function(){var A=this;var bb=[];A.options.each(function(bc){if(bc.get(A.get(aw))){bb.push(bc);}});return ao.all(bb);},_onEditEvent:function(bb){var A=this;A._handleInitEditEvent();A.toggleEdit();A._syncEditOptionsUI();},_onEditLinkClickEvent:function(bb){var A=this;var bc=bb.currentTarget;if(bc.test(h+f)){A.addNewOption();}else{if(bc.test(h+O)){A.saveOptions();}else{if(bc.test(h+a2)){A.toggleEdit();}else{if(bc.test(h+aO)){A.removeOption(bc.ancestor(h+ax));}}}}bb.halt();},_onEditKeyEvent:function(bb){var A=this;var bc=bb.currentTarget;if(bb.isKey(ae)){var bd=bc.next(Z);if(bd){bd.selectText();}else{A.addNewOption();}bb.halt();}},_setOptions:function(bb){var A={};if(d(bb)){a8.each(bb,function(bc){A[bc]=bc;});}else{if(G(bb)){A=bb;}}return A;},_syncEditOptionsUI:function(){var A=this;A.editContainer.setContent(A._createEditBuffer());},_uiSetOptions:function(bb){var A=this;A._createOptions(bb);A._syncElementsName();},_uiSetValue:function(bc){var A=this;var bb=A.options;if(bb&&bb.size()){bb.set(A.get(aw),false);
a8.each(a8(bc),function(bd){bb.filter('[value="'+bd+'"]').set(A.get(aw),true);});}return bc;}}});ao.BaseOptionsCellEditor=a9;var av=ao.Component.create({NAME:w,EXTENDS:ao.BaseCellEditor,prototype:{ELEMENT_TEMPLATE:'<input class="'+S+'" type="text" />'}});ao.TextCellEditor=av;var aA=ao.Component.create({NAME:Q,EXTENDS:ao.BaseCellEditor,prototype:{ELEMENT_TEMPLATE:'<textarea class="'+S+'"></textarea>'}});ao.TextAreaCellEditor=aA;var L=ao.Component.create({NAME:aJ,ATTRS:{multiple:{value:false,validator:aN}},EXTENDS:ao.BaseOptionsCellEditor,UI_ATTRS:[Y],prototype:{ELEMENT_TEMPLATE:'<select class="'+S+'"></select>',OPTION_TEMPLATE:'<option value="{value}">{label}</option>',getElementsValue:function(){var A=this;if(A.get(Y)){return A._getSelectedOptions().get(aX);}return A.elements.get(aX);},_uiSetMultiple:function(bc){var A=this;var bb=A.elements;if(bc){bb.setAttribute(Y,Y);}else{bb.removeAttribute(Y);}}}});ao.DropDownCellEditor=L;var aj=ao.Component.create({NAME:B,ATTRS:{selectedAttrName:{value:n}},EXTENDS:ao.BaseOptionsCellEditor,prototype:{ELEMENT_TEMPLATE:'<div class="'+S+'"></div>',OPTION_TEMPLATE:'<input class="'+I+'" id="{id}" name="{name}" type="checkbox" value="{value}"/>',OPTION_WRAPPER:'<label class="'+v+'" for="{id}"><span class="'+aR+'">{label}</span></label>',getElementsValue:function(){var A=this;return A._getSelectedOptions().get(aX);}}});ao.CheckboxCellEditor=aj;var H=ao.Component.create({NAME:ah,EXTENDS:ao.CheckboxCellEditor,prototype:{OPTION_TEMPLATE:'<input class="yui3-aui-field-input-choice" id="{id}" name="{name}" type="radio" value="{value}"/>',getElementsValue:function(){var A=this;return A._getSelectedOptions().get(aX)[0];},_syncElementsName:function(){var A=this;var bb=A.options;if(bb){bb.setAttribute(k,A.get(ay));}}}});ao.RadioCellEditor=H;var a=ao.Component.create({NAME:J,EXTENDS:ao.BaseCellEditor,ATTRS:{bodyContent:{value:R},calendar:{setter:"_setCalendar",validator:G,value:null}},prototype:{ELEMENT_TEMPLATE:'<input class="'+S+'" type="hidden" />',initializer:function(){var A=this;A.on("calendar:select",ao.bind(A._onDateSelect,A));},getElementsValue:function(){var A=this;return A.calendar.getFormattedSelectedDates().join(ba);},_afterRender:function(){var A=this;ao.DateCellEditor.superclass._afterRender.apply(A,arguments);A.calendar=new ao.Calendar(A.get(P)).render(A.bodyNode);},_onDateSelect:function(bb){var A=this;A.elements.val(bb.date.formatted.join(ba));},_setCalendar:function(bb){var A=this;return ao.merge({bubbleTargets:A},bb);},_uiSetValue:function(bc){var A=this;var bb=A.calendar;if(bb){if(bc&&aS(bc)){bc=bc.split(ba);}A.calendar.set("dates",bc);}}}});ao.DateCellEditor=a;},"@VERSION@",{requires:["aui-calendar","aui-datatable-events","aui-toolbar","aui-form-validator","overlay"],skinnable:true});