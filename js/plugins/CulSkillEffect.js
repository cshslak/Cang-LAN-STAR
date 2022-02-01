/*:
 * @plugindesc 装備・スキル特殊効果
 * @author しもや
 * @help
 * 装備とスキルの効果を読み込む。並列処理でループを使うより軽くなった。
 * ・プラグインコマンド
 *   CulSkillEffect
 */

(function(){
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'CulSkillEffect') {
            SkillResetAll()

            //装備スキルチェック
            var EquipNo = 1 //部位番号
            var EquipID = 0 //部位の装備ID用
            var Other1 = 4
            var Other2 = 5
            var Other1EqID = 0
            var Other2EqID = 0


            for(var i = 1; i < 7; i++){
                EquipID = $gameActors._data[1]._equips[EquipNo]._itemId
                if(EquipID >= 1){
                    if(EquipNo == Other1){Other1EqID = EquipID}
                    if(EquipNo == Other2 && EquipID == Other1EqID){//同一装備の場合スルー
                        //
                    }else{
                        $gameVariables._data[4211] = $dataArmors[EquipID].meta.Skill01
                        $gameVariables._data[4212] = $dataArmors[EquipID].meta.Skill02
                        $gameVariables._data[4213] = $dataArmors[EquipID].meta.Skill03
                        $gameVariables._data[4214] = $dataArmors[EquipID].meta.Skill04
                        $gameVariables._data[4215] = $dataArmors[EquipID].meta.Skill05
                        $gameVariables._data[4216] = $dataArmors[EquipID].meta.Skill06
                        $gameVariables._data[4217] = $dataArmors[EquipID].meta.Skill07
                        $gameVariables._data[4218] = $dataArmors[EquipID].meta.Skill08
                        $gameVariables._data[4219] = $dataArmors[EquipID].meta.Skill09
                        $gameVariables._data[4220] = $dataArmors[EquipID].meta.Skill10
                        //スキル効果入力
                         //console.log($gameVariables.value(4211))
                        AddSkillEffect()
                    }
                }
                EquipNo += 1 
            }


            
            SkillReset()

            //Pスキル効果
            var SkillID = 135
            for(var i = SkillID; i < 999; i++){
                if($dataSkills[i].meta.flag == "SkillEffect"){
                    
                    if($gameActors.actor(1).addedSkills().contains(i) || $gameActors.actor(1).isLearnedSkill(i)){
                        $gameVariables._data[4211] = $dataSkills[i].meta.Skill01
                        $gameVariables._data[4212] = $dataSkills[i].meta.Skill02
                        $gameVariables._data[4213] = $dataSkills[i].meta.Skill03
                        $gameVariables._data[4214] = $dataSkills[i].meta.Skill04
                        $gameVariables._data[4215] = $dataSkills[i].meta.Skill05
                        $gameVariables._data[4216] = $dataSkills[i].meta.Skill06
                        $gameVariables._data[4217] = $dataSkills[i].meta.Skill07
                        $gameVariables._data[4218] = $dataSkills[i].meta.Skill08
                        $gameVariables._data[4219] = $dataSkills[i].meta.Skill09
                        $gameVariables._data[4220] = $dataSkills[i].meta.Skill10
                        //console.log($dataSkills[i].meta.Skill01)
                        //スキル効果入力
                        AddSkillEffect()
                    }
                }
                if(i == 255){i = 700}
            }
            SkillReset()
            AddSkillEffectBase()
        }


        function SkillResetAll(){
            for(var i = 4221; i <= 4320; i++){
                $gameVariables._data[i] = 0
            }
        }

        function SkillReset(){
            for(var i = 4211; i <= 4220; i++){
                $gameVariables._data[i] = 0
            }
        }

        function AddSkillEffect(){
            for(var i = 4211; i <= 4220; i++){
                if($gameVariables.value(i) != 0){
                    $gameVariables._data[4206] = $gameVariables.value(i)[0] + 4200
                    $gameVariables._data[4207] = $gameVariables.value(i)[1]
                    $gameVariables._data[$gameVariables.value(4206)] += $gameVariables.value(4207)

                }
            }
        }

        function AddSkillEffectBase(){
            var TagSkillID = 21//スキル番号(21からなのは都合上)
            var TagSkillIDMax = 121//スキル最大数(実質100まで)
            var BaseVariable = 0//実際に判定に使う効果加算対象の変数番号
            var AddVariable = 0//加算する効果値の変数番号
            var BaseNumber = 0//効果初期値
            
            for(var i = TagSkillID; i < TagSkillIDMax; i++){
    		    BaseVariable = Number($tag_skill_list[i].BaseVar)//実際に判定に使う効果加算対象の変数番号
                AddVariable = Number($tag_skill_list[i].AddVar)//加算する効果値の変数番号
                BaseNumber = Number($tag_skill_list[i].BaseNum)//効果初期値
                if($gameVariables.value(AddVariable) != 0){//効果値加算
                    $gameVariables._data[BaseVariable] = BaseNumber + $gameVariables.value(AddVariable)
                //}else if(BaseNumber != 0){//ベース値代入
                //    $gameVariables._data[BaseVariable] = BaseNumber
                }else{
                    $gameVariables._data[BaseVariable] = BaseNumber
                }
            }
            if($gameActors._data[1]._equips[1]._itemId == 0){var NakedSexual = 40}else{var NakedSexual = 0}
            $gameVariables._data[1200] += NakedSexual 
        }


    }

})();
