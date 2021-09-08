#include<stdio.h>
#include<stdint.h>
#include<math.h>

#define DIGITS 100001
const int digits = DIGITS;

void init ( char *e, char *x ) {
  int i;
  e[0] = x[0] = '5';
  for ( i=1; i<digits; i++ ) {
    e[i] = x[i] = '0';
  }
  e[digits-1] = x[digits-1] = '\0';
}

// x <- x + y
void add ( char *x, char *y ) {
  int i;
  int c=0,z;
  for ( i=digits-2; i>=0; i-- ) {
    z = (x[i]-'0') + (y[i]-'0') + c;
    c = z/10;
    z = z%10;
    x[i] = z + '0';
  }
}

// x <- x / y
void div ( char *x, int y ) {
  int i;
  int p=0;
  // p[i] =x[i]*y + p[i+1]
  for ( i=0; i<digits-1; i++ ) {
    p = p*10 + (x[i]-'0');
    x[i] = p / y + '0';
    p = p % y;
  }
}

int main ( void ) {
  // e = sum {n=0->infty} ( 1/n! )
  char e[DIGITS]={0};
  char x[DIGITS]={0};
  int i;
  init(e,x);
  for ( i=3; i<25207; i++ ) {
    div(x,i);
    add(e,x);
    if ( i%1000 == 0 ) {
      fprintf(stderr,"x[%5d]=0.%s\n",i,x);
      fprintf(stderr,"e[%5d]=2.%s\n",i,e);
    }
  }
  fprintf(stderr,"x[%5d]=0.%s\n",i,x);
  getchar();
  fprintf(stderr,"e[%5d]=2.%s\n",i,e);
  fprintf(stdout,"e[%5d]=2.%s\n",i,e);
  return 0;
}

