/*******************************************************************************
 * Copyright (c) 2017 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Distribution License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/org/documents/edl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 ******************************************************************************/
jswidgets.ActionPropertiesBox = function() {
  jswidgets.ActionPropertiesBox.parent.call(this);
  this.field = null;
};
scout.inherits(jswidgets.ActionPropertiesBox, scout.GroupBox);

jswidgets.ActionPropertiesBox.prototype._jsonModel = function() {
  return scout.models.getModel('jswidgets.ActionPropertiesBox');
};

jswidgets.ActionPropertiesBox.prototype._init = function(model) {
  jswidgets.ActionPropertiesBox.parent.prototype._init.call(this, model);

  this._setField(this.field);
};

jswidgets.ActionPropertiesBox.prototype.setField = function(field) {
  this.setProperty('field', field);
};

jswidgets.ActionPropertiesBox.prototype._setField = function(field) {
  this._setProperty('field', field);
  this.setEnabled(this.field);
  if (!this.field) {
    return;
  }
  var enabledField = this.widget('EnabledField');
  enabledField.setValue(this.field.enabled);
  enabledField.on('propertyChange', this._onPropertyChange.bind(this));

  var visibleField = this.widget('VisibleField');
  visibleField.setValue(this.field.visible);
  visibleField.on('propertyChange', this._onPropertyChange.bind(this));

  var toggleActionField = this.widget('ToggleActionField');
  toggleActionField.setValue(this.field.toggleAction);
  toggleActionField.on('propertyChange', this._onPropertyChange.bind(this));

  var selectedField = this.widget('SelectedField');
  selectedField.setValue(this.field.selected);
  selectedField.on('propertyChange', this._onPropertyChange.bind(this));

  var iconIdField = this.widget('IconIdField');
  iconIdField.setValue(this.field.iconId);
  iconIdField.on('propertyChange', this._onPropertyChange.bind(this));

  var keyStrokeField = this.widget('KeyStrokeField');
  keyStrokeField.setValue(this.field.keyStroke);
  keyStrokeField.on('propertyChange', this._onPropertyChange.bind(this));

  var textField = this.widget('TextField');
  textField.setValue(this.field.text);
  textField.on('propertyChange', this._onPropertyChange.bind(this));

  var tooltipTextField = this.widget('TooltipTextField');
  tooltipTextField.setValue(this.field.tooltipText);
  tooltipTextField.on('propertyChange', this._onPropertyChange.bind(this));

  var horizontalAlignmentField = this.widget('HorizontalAlignmentField');
  horizontalAlignmentField.setValue(this.field.horizontalAlignment);
  horizontalAlignmentField.on('propertyChange', this._onPropertyChange.bind(this));

  var actionStyleField = this.widget('ActionStyleField');
  actionStyleField.setValue(this.field.actionStyle);
  actionStyleField.on('propertyChange', this._onPropertyChange.bind(this));
};

jswidgets.ActionPropertiesBox.prototype._onPropertyChange = function(event) {
  if (event.propertyName === 'value' && event.source.id === 'EnabledField') {
    this.field.setEnabled(event.newValue);
  } else if (event.propertyName === 'value' && event.source.id === 'VisibleField') {
    this.field.setVisible(event.newValue);
  } else if (event.propertyName === 'value' && event.source.id === 'ToggleActionField') {
    this.field.setToggleAction(event.newValue);
  } else if (event.propertyName === 'value' && event.source.id === 'SelectedField') {
    this.field.setSelected(event.newValue);
  } else if (event.propertyName === 'value' && event.source.id === 'IconIdField') {
    this.field.setIconId(event.newValue);
  } else if (event.propertyName === 'value' && event.source.id === 'KeyStrokeField') {
    this.field.setKeyStroke(event.newValue);
  } else if (event.propertyName === 'value' && event.source.id === 'TextField') {
    this.field.setText(event.newValue);
  } else if (event.propertyName === 'value' && event.source.id === 'TooltipTextField') {
    this.field.setTooltipText(event.newValue);
  } else if (event.propertyName === 'value' && event.source.id === 'HorizontalAlignmentField') {
    this.field.setHorizontalAlignment(event.newValue);
  } else if (event.propertyName === 'value' && event.source.id === 'ActionStyleField') {
    // ActionStyle may not be changed during run time officially, use this little hack to work around by rerendering the whole menu bar
    this.field.actionStyle = event.newValue;
    if (this.field.parent instanceof scout.MenuBar) {
      var menuItems = this.field.parent.menuItems;
      this.field.parent.setMenuItems([]);
      this.field.parent.setMenuItems(menuItems);
    }
  }
};
