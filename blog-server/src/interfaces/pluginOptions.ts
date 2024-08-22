export interface PluginOptions {
  dtoFileNameSuffix?: string[]; // DTO 数据传输对象 文件后缀 ['.dto.ts', '.entity.ts']
  controllerFileNameSuffix?: string[]; // 控制器文件后缀 .controller.ts
  classValidatorShim?: boolean; // 如果设置为 true，模块将重用 class-validator 验证装饰器（例如， @Max(10) 会将 max: 10 添加到模式定义中）
  dtoKeyOfComment?: string; // 用于在 ApiProperty 上设置注释文本的属性键。 'description'
  controllerKeyOfComment?: string; // 用于在 ApiOperation 上设置注释文本的属性键。
  introspectComments?: boolean; // 如果设置为 true，插件将根据注释为属性生成描述和示例值
}
