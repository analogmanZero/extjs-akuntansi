Ext.define('Admin.view.currency', {
    
    kurs: function (val, rate, tipe) {
        //tambahan rachman
       // if(val==null) return ;
       // if(!tipe) return rate==0?0:(eval(val.replace(/[\,]/g, ''))/rate);
       val += '';
       if(!tipe) return rate==0?0: (eval(val?(val.replace(/[\,]/g, '')):0)/rate);
		 	
        var disk = val.split('+');
        var diskon = '';
        for(var j=0; j<disk.length; j++)
            diskon = diskon + (diskon!=''?'+':'') +
                     (disk[j].indexOf('%')!=-1?disk[j]:
                     rate==0?0:(eval(disk[j].replace(/[\,]/g, ''))/rate));

        return diskon.replace(/[\,]/g, '');

    },
    diskon: function (diskon, rate) {
      
        if(!diskon) return '0';
        if(diskon=='') return '0';

        var result = '';
        var disk = diskon.split('+');
        for(var i=0;i<disk.length;i++) {
            disk[i]=disk[i]==''?'0':disk[i].replace(/[\,]/g, '');
            result  = result + (result!=''?'+':'') +
                (rate?
                    (disk[i].indexOf('%')!=-1?disk[i]:
                        eval(disk[i].replace(/[\%]/g, ''))*rate):
                    (this.currency(disk[i]) +
                    (disk[i].indexOf('%')!=-1?'%':'')));

        }
        return result; //.replace('+0','+');
    },

    currency: function (nums, dec) {

        if(!nums) return '0';
        if(nums=='') return '0';

        dec=dec==undefined?2:dec;
        nums = String(nums).replace(/[\,%]/g, '');
        nums = nums.split('.').length<2?
                    nums:
                    (nums.split('.')[1].length>dec?
                        String(eval(nums).toFixed(dec)):
                        nums);

        
        if(nums=='' || nums=='0') return '0';

        while (nums.substring(0,1)=='0' && nums.substring(1,2)!='.') {
            nums = nums.substring(1,nums.length);
            if(nums=='0') return '0';
        }

        nums = nums.replace('.','. ');
        

        var num = nums.split('.')[0];
        var numArr=new String(num).split('').reverse();
        for (var i=3;i<numArr.length;i+=3)
            numArr[i]+=',';

        var decimal = (nums.split('.')[1]?('.'+(nums.split('.')[1]).trim()):'');

        if(decimal.length==3) decimal = decimal.replace('.00','');
        return (numArr.reverse().join('') + decimal).replace('-,', '-');
    },
        
    terbilang: function(bilangan){
    	var cat = bilangan.indexOf(".") ;
    	var k='';
        if (cat>0){
        	var bilBaru = bilangan.substr(0,cat) ;
        		
        		var bilPecahan = bilangan.substr((cat+1),bilangan.length);
        		bilangan = bilBaru;
				 k =' , '+this.terbilangA(bilPecahan)+' Sen';	
				// k = bilPecahan ;
			}	
			var u =this.terbilangA(bilangan);
			
    	return u+k ;
    },

    terbilangA: function(bilangan) {
        
        bilangan    = String(bilangan);
        var angka   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
        var kata    = new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan');
        var tingkat = new Array('','Ribu','Juta','Milyar','Triliun');

        var panjang_bilangan = bilangan.length;

        /* pengujian panjang bilangan */
        if (panjang_bilangan > 15) {
            kaLimat = "Diluar Batas";
            return kaLimat;
        }

        /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
        for (i = 1; i <= panjang_bilangan; i++) {
            angka[i] = bilangan.substr(-(i),1);
        }

        i = 1;
        j = 0;
        kaLimat = "";


        /* mulai proses iterasi terhadap array angka */
        while (i <= panjang_bilangan) {

            subkaLimat = "";
            kata1 = "";
            kata2 = "";
            kata3 = "";

            /* untuk Ratusan */
            if (angka[i+2] != "0") {
                if (angka[i+2] == "1") {
                    kata1 = "Seratus";
                } else {
                    kata1 = kata[angka[i+2]] + " Ratus";
                }
            }

            /* untuk Puluhan atau Belasan */
            if (angka[i+1] != "0") {
                if (angka[i+1] == "1") {
                    if (angka[i] == "0") {
                        kata2 = "Sepuluh";
                    } else if (angka[i] == "1") {
                        kata2 = "Sebelas";
                    } else {
                        kata2 = kata[angka[i]] + " Belas";
                    }
                } else {
                    kata2 = kata[angka[i+1]] + " Puluh";
                }
            }

            /* untuk Satuan */
            if (angka[i] != "0") {
                if (angka[i+1] != "1") {
                    kata3 = kata[angka[i]];
                }
            }

            /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
            if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")) {
                subkaLimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
            }

            /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
            kaLimat = subkaLimat + kaLimat;
            i = i + 3;
            j = j + 1;

        }

        /* mengganti Satu Ribu jadi Seribu jika diperlukan */
        if ((angka[5] == "0") && (angka[6] == "0")) {
            kaLimat = kaLimat.replace("Satu Ribu","Seribu");
        }

        return kaLimat ;
    }

});